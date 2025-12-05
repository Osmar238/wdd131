<?php
// ver_detalle_corte.php

session_start();
require 'db_connect.php';

// Seguridad: Solo Admin
if (!isset($_SESSION['usuario_rol']) || $_SESSION['usuario_rol'] != 'Admin') {
    header("Location: login.php?error=acceso_denegado");
    exit;
}

// Validar ID
if (!isset($_GET['id'])) {
    header("Location: portal_admin.php");
    exit;
}

$corte_id = intval($_GET['id']);

// 1. OBTENER INFORMACIÓN DEL CORTE
$sql_corte = "SELECT c.*, u.nombre as admin_nombre 
              FROM cortes_caja c 
              LEFT JOIN usuarios u ON c.admin_id = u.id 
              WHERE c.id = ?";
$stmt = $conn->prepare($sql_corte);
$stmt->bind_param("i", $corte_id);
$stmt->execute();
$resultado_corte = $stmt->get_result();

if ($resultado_corte->num_rows === 0) {
    die("Corte no encontrado.");
}

$corte = $resultado_corte->fetch_assoc();
$ids_pedidos = $corte['pedidos_cerrados_ids']; 

// 2. OBTENER LOS PEDIDOS DE ESE CORTE
$pedidos = [];
if (!empty($ids_pedidos)) {
    $sql_detalles = "SELECT p.id, p.fecha_pedido, p.total, u.nombre as cliente 
                     FROM pedidos p
                     JOIN usuarios u ON p.usuario_id = u.id
                     WHERE p.id IN ($ids_pedidos)
                     ORDER BY p.id DESC";
    $res_detalles = $conn->query($sql_detalles);
    while($row = $res_detalles->fetch_assoc()) {
        $pedidos[] = $row;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle Corte #<?php echo $corte_id; ?> | La Joya</title>
    <link rel="stylesheet" href="login.css"> 
    <style>
        body { background-color: #fffbf2; font-family: 'Segoe UI', sans-serif; }
        .receipt-container {
            max-width: 700px;
            margin: 40px auto;
            background: #fff;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            border-radius: 12px;
            border-top: 6px solid #d4af37;
        }
        .header-receipt {
            text-align: center;
            border-bottom: 2px dashed #eee;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        .header-receipt h1 { margin: 0; color: #333; font-family: 'Playfair Display', serif; }
        .meta-info { display: flex; justify-content: space-between; margin-bottom: 20px; color: #666; font-size: 14px; }
        
        .table-receipt { width: 100%; border-collapse: collapse; }
        .table-receipt th { text-align: left; color: #888; font-size: 12px; text-transform: uppercase; padding: 10px; border-bottom: 1px solid #eee; }
        .table-receipt td { padding: 15px 10px; border-bottom: 1px solid #f9f9f9; color: #333; font-weight: 600; }
        .total-row td { font-size: 20px; color: #d4af37; border-top: 2px solid #eee; border-bottom: none; padding-top: 20px; }
        
        .btn-back {
            display: inline-block;
            margin-top: 30px;
            text-decoration: none;
            background-color: #333;
            color: #fff;
            padding: 10px 25px;
            border-radius: 30px;
            font-weight: bold;
            font-size: 14px;
            transition: background 0.3s;
        }
        .btn-back:hover { background-color: #555; }
    </style>
</head>
<body>

<div class="receipt-container">
    <div class="header-receipt">
        <h1>Reporte de Corte #<?php echo $corte_id; ?></h1>
        <p style="color: #888; margin-top: 5px;">Comprobante de Cierre de Caja</p>
    </div>

    <div class="meta-info">
        <div>
            <strong>Fecha:</strong> <?php echo date('d/m/Y h:i A', strtotime($corte['fecha_corte'])); ?><br>
            <strong>Realizado por:</strong> <?php echo htmlspecialchars($corte['admin_nombre']); ?>
        </div>
        <div style="text-align: right;">
            <strong>Estado:</strong> <span style="color: green; font-weight: bold;">CERRADO</span>
        </div>
    </div>

    <table class="table-receipt">
        <thead>
            <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Hora Pedido</th>
                <th style="text-align: right;">Monto</th>
            </tr>
        </thead>
        <tbody>
            <?php if (count($pedidos) > 0): ?>
                <?php foreach ($pedidos as $p): ?>
                <tr>
                    <td>#LJ-<?php echo $p['id']; ?></td>
                    <td><?php echo htmlspecialchars($p['cliente']); ?></td>
                    <td><?php echo date('h:i A', strtotime($p['fecha_pedido'])); ?></td>
                    <td style="text-align: right;">$<?php echo number_format($p['total'], 2); ?></td>
                </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr><td colspan="4" style="text-align:center; color:#999;">No se encontraron detalles de los pedidos.</td></tr>
            <?php endif; ?>
            
            <tr class="total-row">
                <td colspan="3" style="text-align: right;">TOTAL CORTADO:</td>
                <td style="text-align: right;">$<?php echo number_format($corte['total_vendido'], 2); ?></td>
            </tr>
        </tbody>
    </table>

    <div style="text-align: center;">
        <a href="portal_admin.php?vista=sales" class="btn-back">← Volver al Panel</a>
    </div>
</div>

</body>
</html>
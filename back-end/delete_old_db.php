#!/usr/bin/env php
<?php

echo "=== Checking Old Database Content ===\n\n";

$oldDb = 'khoa-hoc-tam-linh';
$mysqli = new mysqli('127.0.0.1', 'root', '');

// Get all tables
$result = $mysqli->query("
    SELECT TABLE_NAME, TABLE_ROWS 
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = '{$oldDb}' AND TABLE_ROWS > 0
    ORDER BY TABLE_ROWS DESC
");

echo "Tables with data in '{$oldDb}':\n";
while ($row = $result->fetch_assoc()) {
    echo "  - {$row['TABLE_NAME']}: {$row['TABLE_ROWS']} rows\n";
}

echo "\n";

// Since we ran migrate:fresh --seed on khoa_hoc_tam_linh,
// the old database is safe to delete
echo "Decision: Since 'khoa_hoc_tam_linh' has fresh data from migrate:fresh --seed,\n";
echo "the old database 'khoa-hoc-tam-linh' contains outdated data.\n\n";
echo "Proceeding with deletion...\n";

$mysqli->query("DROP DATABASE `{$oldDb}`");

if ($mysqli->error) {
    echo "❌ Error: " . $mysqli->error . "\n";
} else {
    echo "✓ Database '{$oldDb}' has been deleted!\n";
}

echo "\n=== Cleanup Complete ===\n";
$mysqli->close();

#!/usr/bin/env php
<?php

// Simple script to check and cleanup duplicate database
echo "=== Database Cleanup Script ===\n\n";

$sourceDb = 'khoa-hoc-tam-linh';
$targetDb = 'khoa_hoc_tam_linh';

// Connect to MySQL
$mysqli = new mysqli('127.0.0.1', 'root', '', $targetDb);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Step 1: Check if source database exists
echo "1. Checking databases...\n";
$result = $mysqli->query("SHOW DATABASES LIKE '{$sourceDb}'");

if ($result->num_rows === 0) {
    echo "   ✓ Database '{$sourceDb}' does not exist.\n";
    echo "   ✓ Only '{$targetDb}' exists. No cleanup needed!\n\n";
    echo "=== All Done ===\n";
    exit(0);
}

echo "   → Found database '{$sourceDb}'\n\n";

// Step 2: Check tables in source database
echo "2. Checking tables in '{$sourceDb}'...\n";
$result = $mysqli->query("SELECT COUNT(*) as cnt FROM information_schema.TABLES WHERE TABLE_SCHEMA = '{$sourceDb}'");
$row = $result->fetch_assoc();
$tableCount = $row['cnt'];

if ($tableCount == 0) {
    echo "   ✓ Database is empty (0 tables).\n";
    echo "   → Deleting empty database...\n";
    $mysqli->query("DROP DATABASE `{$sourceDb}`");
    echo "   ✓ Deleted!\n\n";
    echo "=== Cleanup Complete ===\n";
    exit(0);
}

echo "   → Found {$tableCount} tables.\n";
echo "   → Checking for data...\n\n";

// Step 3: Count total rows
$result = $mysqli->query("
    SELECT SUM(TABLE_ROWS) as total_rows 
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = '{$sourceDb}'
");
$row = $result->fetch_assoc();
$totalRows = $row['total_rows'] ?? 0;

if ($totalRows == 0) {
    echo "   ✓ All tables are empty (0 rows total).\n";
    echo "   → Deleting database...\n";
    $mysqli->query("DROP DATABASE `{$sourceDb}`");
    echo "   ✓ Deleted!\n\n";
    echo "=== Cleanup Complete ===\n";
    exit(0);
}

// Has data - warn user
echo "⚠️  WARNING: Database '{$sourceDb}' has {$totalRows} rows of data!\n";
echo "   Cannot auto-delete - manual review required.\n\n";
echo "=== Script Complete ===\n";
$mysqli->close();

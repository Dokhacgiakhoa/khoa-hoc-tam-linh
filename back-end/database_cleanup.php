<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Script to merge and cleanup duplicate databases

echo "=== Database Consolidation Script ===\n\n";

$sourceDb = 'khoa-hoc-tam-linh';
$targetDb = 'khoa_hoc_tam_linh';

// Step 1: Check if source database exists
echo "1. Checking if database '{$sourceDb}' exists...\n";
$databases = DB::select('SHOW DATABASES');
$dbList = array_map(fn($db) => $db->Database, $databases);

if (!in_array($sourceDb, $dbList)) {
    echo "   ✓ Database '{$sourceDb}' does not exist. No merge needed.\n";
    echo "   ✓ Using '{$targetDb}' as the primary database.\n";
    exit(0);
}

echo "   → Database '{$sourceDb}' found.\n\n";

// Step 2: Check if source database has any tables/data
echo "2. Checking if '{$sourceDb}' has data...\n";
$tables = DB::select("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = '{$sourceDb}'");

if (empty($tables)) {
    echo "   ✓ Database '{$sourceDb}' is empty.\n";
    echo "   → Proceeding to delete...\n\n";
    
    // Step 3: Delete empty database
    echo "3. Deleting empty database '{$sourceDb}'...\n";
    DB::statement("DROP DATABASE `{$sourceDb}`");
    echo "   ✓ Database '{$sourceDb}' has been deleted.\n";
    echo "\n=== Cleanup Complete ===\n";
    exit(0);
}

echo "   → Found " . count($tables) . " tables in '{$sourceDb}'.\n\n";

// Step 3: Check data in each table
echo "3. Checking data in tables...\n";
$hasData = false;
foreach ($tables as $table) {
    $tableName = $table->TABLE_NAME;
    $count = DB::select("SELECT COUNT(*) as cnt FROM `{$sourceDb}`.`{$tableName}`")[0]->cnt;
    if ($count > 0) {
        echo "   → Table '{$tableName}': {$count} rows\n";
        $hasData = true;
    }
}

if (!$hasData) {
    echo "   ✓ All tables are empty.\n";
    echo "   → Proceeding to delete...\n\n";
    
    echo "4. Deleting database '{$sourceDb}'...\n";
    DB::statement("DROP DATABASE `{$sourceDb}`");
    echo "   ✓ Database '{$sourceDb}' has been deleted.\n";
    echo "\n=== Cleanup Complete ===\n";
    exit(0);
}

// Step 4: Warn about data - manual intervention needed
echo "\n⚠️  WARNING: Database '{$sourceDb}' contains data!\n";
echo "   This script cannot safely auto-merge without risking data loss.\n";
echo "   Please manually review the data and merge if needed.\n";
echo "\n   Recommended action:\n";
echo "   1. Export data from '{$sourceDb}' using phpMyAdmin or mysqldump\n";
echo "   2. Import into '{$targetDb}' if needed\n";
echo "   3. Run this script again to delete '{$sourceDb}'\n";
echo "\n=== Script Complete ===\n";

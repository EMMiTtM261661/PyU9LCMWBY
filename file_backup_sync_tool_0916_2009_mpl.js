// 代码生成时间: 2025-09-16 20:09:09
const fs = require('fs');
const path = require('path');
const { remote } = require('electron');

// ThreeJS is not required for this task, as it deals with 3D graphics and not file operations.

/**
 * Synchronizes a source directory with a destination directory.
 * @param {string} sourcePath - The path to the source directory.
 * @param {string} destPath - The path to the destination directory. */
function syncDirectories(sourcePath, destPath) {
  try {
    // Read the directory structure of sourcePath
    const sourceEntries = fs.readdirSync(sourcePath, { withFileTypes: true });

    // Iterate over each entry in the source directory
    sourceEntries.forEach(entry => {
      const sourceEntryPath = path.join(sourcePath, entry.name);
      const destEntryPath = path.join(destPath, entry.name);

      if (entry.isDirectory()) {
        // If the destination directory does not exist, create it
        if (!fs.existsSync(destEntryPath)) {
          fs.mkdirSync(destEntryPath);
        }
        // Recursively sync the subdirectory
        syncDirectories(sourceEntryPath, destEntryPath);
      } else {
        // If the file does not exist in the destination, copy it
        if (!fs.existsSync(destEntryPath)) {
          fs.copyFileSync(sourceEntryPath, destEntryPath);
        }
      }
    });
  } catch (error) {
    console.error('An error occurred while syncing directories:', error);
  }
}

/**
 * Backs up a source directory to a backup directory.
 * @param {string} sourcePath - The path to the source directory.
 * @param {string} backupPath - The path to the backup directory. */
function backupDirectory(sourcePath, backupPath) {
  try {
    // If the backup directory does not exist, create it
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath);
    }

    // Use syncDirectories to perform the backup
    syncDirectories(sourcePath, backupPath);
  } catch (error) {
    console.error('An error occurred while backing up the directory:', error);
  }
}

// Example usage:
// backupDirectory('/path/to/source', '/path/to/backup');
// syncDirectories('/path/to/source', '/path/to/destination');

/**
 * Main function that sets up the file backup and sync process.
 * This function is intended to be called from an Electron application main process.
 */
function main() {
  const sourcePath = remote.dialog.showOpenDialogSync({
    title: 'Select Source Directory',
    properties: ['openDirectory']
  });

  if (sourcePath) {
    const backupPath = remote.dialog.showSaveDialogSync({
      title: 'Select Backup Directory',
      defaultPath: path.join(sourcePath[0], 'backup')
    });

    if (backupPath) {
      backupDirectory(sourcePath[0], backupPath);
      console.log('Backup completed successfully.');
    }
  }
}

// Run the main function if this script is executed directly
if (require.main === module) {
  main();
}

// Export the functions for use in other modules
module.exports = {
  syncDirectories,
  backupDirectory
};
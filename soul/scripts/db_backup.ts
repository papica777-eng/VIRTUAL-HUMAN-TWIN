// z:\soul\scripts\db_backup.ts
import { mkdir, readdir, unlink } from "node:fs/promises";
import { join } from "node:path";

const VAULT_DIR = "z:/soul/vault";
const ROOT_DIR = "z:/soul";
const BACKUP_DIR = join(VAULT_DIR, "backups");
const BACKUP_RETENTION_DAYS = 7;

const DATABASES_MAP: Record<string, string> = {
  "client_database.json": ROOT_DIR,
  "SovereignLedger.json": VAULT_DIR,
  "omnicore_licenses.json": VAULT_DIR,
  "federated_training_history.json": VAULT_DIR
};

async function executeBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  console.log(`[BACKUP] Starting database backup sequence at ${timestamp}...`);

  // Ensure backup folder exists
  await mkdir(BACKUP_DIR, { recursive: true });

  for (const [filename, dirPath] of Object.entries(DATABASES_MAP)) {
    const sourcePath = join(dirPath, filename);
    const backupFileName = `${timestamp}_${filename}`;
    const targetPath = join(BACKUP_DIR, backupFileName);

    try {
      const file = Bun.file(sourcePath);
      if (await file.exists()) {
        await Bun.write(targetPath, file);
        console.log(`[BACKUP] Successfully backed up: ${filename} -> backups/${backupFileName}`);
      } else {
        console.warn(`[BACKUP] Source file not found, skipping: ${filename}`);
      }
    } catch (error) {
      console.error(`[BACKUP] Error backing up ${filename}:`, error);
    }
  }

  await pruneOldBackups();
  console.log("[BACKUP] Backup sequence finished successfully.\n");
}

async function pruneOldBackups() {
  console.log("[BACKUP] Checking for expired backups to prune...");
  try {
    const files = await readdir(BACKUP_DIR);
    const now = Date.now();
    const expiryMs = BACKUP_RETENTION_DAYS * 24 * 60 * 60 * 1000;

    for (const file of files) {
      const filePath = join(BACKUP_DIR, file);
      const stats = await Bun.file(filePath);
      if (await stats.exists()) {
        const fileObj = Bun.file(filePath);
        
        // Timestamp format: YYYY-MM-DDTHH-MM-SS-MSZ
        const parts = file.split("_");
        if (parts.length > 0) {
          // Reconstruct original ISO string safely
          const dateStr = parts[0].replace(/-/g, (match, offset) => {
            if (offset === 13 || offset === 16) return ":";
            return match;
          });
          
          try {
            const backupTime = Date.parse(dateStr);
            if (!isNaN(backupTime) && now - backupTime > expiryMs) {
              await unlink(filePath);
              console.log(`[BACKUP] Pruned expired backup file: ${file}`);
            }
          } catch {
            // Ignore if parsing fails, keep safe
          }
        }
      }
    }
  } catch (error) {
    console.error("[BACKUP] Error pruning old backups:", error);
  }
}

// Run immediately when executed directly
await executeBackup();

/**
 * Centralised scroll-lock manager.
 *
 * Multiple sections can independently request a lock; the page only
 * scrolls again once EVERY section has released its lock.
 *
 * Usage:
 *   const id = acquireLock();     // locks body
 *   releaseLock(id);               // releases — unlocks body only when count hits 0
 */

let lockCount = 0;
let lockId = 0;

export function acquireLock(): number {
  if (lockCount === 0) {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none'; // Prevents mobile scroll jumping
  }
  lockCount++;
  return ++lockId;
}

export function releaseLock(_id: number): void {
  if (lockCount > 0) lockCount--;
  if (lockCount === 0) {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }
}

/** Force-release all locks (emergency cleanup). */
export function releaseAllLocks(): void {
  lockCount = 0;
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
}

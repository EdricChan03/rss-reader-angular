import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaSessionService {
  /**
   * Sets the current media session with the specified parameters.
   * @param metadata The metadata to be shown on the session.
   * @param mediaEl A reference of the media element.
   * @param resetActionHandlers Whether to reset the action handlers. (Default: `true`)
   */
  setMediaSession(metadata: MediaMetadata, mediaEl: HTMLMediaElement, resetActionHandlers: boolean = true) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = metadata;

      const skipTime = 10; // Time to skip in seconds

      // Event listeners
      if (resetActionHandlers) {
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
      }

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        mediaEl.currentTime = Math.max(mediaEl.currentTime - skipTime, 0);
      });

      navigator.mediaSession.setActionHandler('seekforward', () => {
        mediaEl.currentTime = Math.min(mediaEl.currentTime + skipTime, mediaEl.duration);
      });

      navigator.mediaSession.setActionHandler('play', async () => {
        await mediaEl.play();
        navigator.mediaSession.playbackState = 'playing';
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        mediaEl.pause();
        navigator.mediaSession.playbackState = 'paused';
      });
    } else {
      console.warn('MediaSessionService: The Media Session API is not supported on this device.');
    }
  }
}

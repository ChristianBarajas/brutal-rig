# Results media and background video

Shopping search links appear on new and existing saved rig results. They are searches, not verified inventory or live price feeds.

Every catalog item now has a dark studio visual. The Boss SD-1 uses a licensed photo with a studio-style AI-assisted edit. The other gear visuals are generated illustrations: they convey the type and aesthetic of the item but may differ from the exact model, finish, or packaging. Each result labels the illustration and directs shoppers to verify the actual product in listings. Guitar and bass variants of the same tuner or cable share a visual. Credits and provenance are recorded in public/gear/CREDITS.md.

## Hero footage

Supply footage you own or have permission to use. Prefer 10–20 seconds, 720p or 1080p, H.264 MP4, no audio, slow cuts without flashing, under about 5 MB.

Place the clip at public/media/hero.mp4, then append this to your existing .env.local (preserve the Firebase values):

```
VITE_HERO_VIDEO_URL=/media/hero.mp4
```

Rebuild and deploy Hosting. The video loops muted beneath a dark overlay and has a pause button. Reduced-motion and Save-Data users receive the static background. No clip is bundled; until configured the current hero remains static.

# PM2 Deployment Guide

## Initial Setup on Linux VM

### 1. Install PM2 globally

```bash
npm install -g pm2
```

### 2. Start the application with PM2

```bash
pm2 start ecosystem.config.cjs
```

### 3. Set PM2 to start on system boot

```bash
# Generate startup script
pm2 startup

# This will output a command you need to run with sudo, something like:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u youruser --hp /home/youruser

# After running the sudo command, save the current PM2 process list
pm2 save
```

## Common PM2 Commands

### View running processes

```bash
pm2 list
```

### View logs

```bash
pm2 logs ludora-dashboard
```

### Restart application

```bash
pm2 restart ludora-dashboard
```

### Stop application

```bash
pm2 stop ludora-dashboard
```

### Monitor CPU/Memory usage

```bash
pm2 monit
```

### Delete from PM2

```bash
pm2 delete ludora-dashboard
```

## Production Deployment

For production, you should build the app and serve it:

### 1. Build the application

```bash
npm run build
```

### 2. Serve with a static server

Install `serve`:

```bash
npm install -g serve
```

### 3. Update ecosystem.config.cjs for production

```javascript
module.exports = {
    apps: [
        {
            name: "ludora-dashboard-prod",
            script: "serve",
            args: "-s dist -l 3000",
            cwd: "./",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "500M",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
```

### 4. Start production server

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

## Notes

-   The dev server will auto-restart if it crashes
-   Logs are stored in `./logs/` directory
-   PM2 will automatically restart the app on server reboot (after running `pm2 startup` and `pm2 save`)

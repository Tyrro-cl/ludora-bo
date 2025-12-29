module.exports = {
  apps: [{
    name: 'ludora-dashboard',
    script: 'npm',
    args: 'run dev',
    cwd: './',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    // PM2 logs
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // Restart settings
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};

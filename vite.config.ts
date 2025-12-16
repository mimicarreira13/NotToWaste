export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: 'all'
  },
  preview: {
    allowedHosts: 'all'
  }
})

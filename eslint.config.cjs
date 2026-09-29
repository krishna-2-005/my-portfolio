const nextConfig = require('eslint-config-next')

module.exports = [{ ignores: ['_archive/**', '.next/**', 'node_modules/**'] }, ...nextConfig]

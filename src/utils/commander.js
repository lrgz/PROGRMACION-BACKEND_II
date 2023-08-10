const { Command } = require('commander')
const { logger } = require('../config/logger')

const program = new Command()

program
    .option('-d', 'Variable for debugging', false)
    .option('--mode <mode>', 'Working mode', 'development')
program.parse();

logger.info("Runtime options: ", program.opts());

module.exports = program
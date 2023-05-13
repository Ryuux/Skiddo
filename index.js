import axios from 'axios';
import { program } from 'commander';
import chalk from 'chalk';

program
  .version('1.0.0')
  .description('GitHub Analytics Tool');

program
  .command('stats <owner> <repo>')
  .description('Get repository statistics')
  .action(async (owner, repo) => {
    try {
      const stats = await getRepositoryStats(owner, repo);
      displayRepositoryStats(owner, repo, stats);
    } catch (error) {
      console.error('Error getting repository statistics:', error.message);
    }
  });

const getRepositoryStats = async (owner, repo) => {
  const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
  
  if (response.status !== 200) {
    throw new Error(`Error getting repository statistics: ${response.statusText}`);
  }
  
  return response.data;
};

const displayRepositoryStats = (owner, repo, stats) => {
  console.log(chalk.bold(`Repository Statistics: ${owner}/${repo}`));
  console.log(`- Stars: ${chalk.yellow(stats.stargazers_count)}`);
  console.log(`- Forks: ${chalk.yellow(stats.forks_count)}`);
  console.log(`- Issues: ${chalk.yellow(stats.open_issues_count)}`);
};

program.parse(process.argv);
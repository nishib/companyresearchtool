import { writeFile } from 'fs/promises';
import { CompanyResearchReport } from './types.js';
import { log, sanitizeFilename, formatDate } from './utils.js';

export class ReportGenerator {
  async generateMarkdown(report: CompanyResearchReport): Promise<string> {
    const { companyInfo, news, techStack, leadership, competitors, researchDate } = report;

    let markdown = '';

    // Header
    markdown += `# ${companyInfo.name} - Company Research Report\n\n`;
    markdown += `**Research Date:** ${formatDate()}\n\n`;
    markdown += `---\n\n`;

    // Company Information
    markdown += `## 📋 Company Overview\n\n`;
    markdown += `**Mission:** ${companyInfo.mission}\n\n`;
    markdown += `${companyInfo.description}\n\n`;

    if (companyInfo.headquarters || companyInfo.industry || companyInfo.website) {
      markdown += `### Key Facts\n\n`;
      if (companyInfo.headquarters) markdown += `- **Headquarters:** ${companyInfo.headquarters}\n`;
      if (companyInfo.industry) markdown += `- **Industry:** ${companyInfo.industry}\n`;
      if (companyInfo.website) markdown += `- **Website:** ${companyInfo.website}\n`;
      markdown += `\n`;
    }

    markdown += `---\n\n`;

    // Recent News
    markdown += `## 📰 Recent News\n\n`;
    if (news.length > 0) {
      news.forEach((item, index) => {
        markdown += `### ${index + 1}. ${item.title}\n\n`;
        markdown += `**Date:** ${item.date} | **Source:** ${item.source}\n\n`;
        markdown += `${item.summary}\n\n`;
        if (item.url) {
          markdown += `[Read more](${item.url})\n\n`;
        }
      });
    } else {
      markdown += `*No recent news found*\n\n`;
    }

    markdown += `---\n\n`;

    // Tech Stack
    markdown += `## 💻 Technology Stack\n\n`;

    if (techStack.languages.length > 0) {
      markdown += `### Programming Languages\n\n`;
      techStack.languages.forEach(lang => {
        markdown += `- ${lang}\n`;
      });
      markdown += `\n`;
    }

    if (techStack.frameworks.length > 0) {
      markdown += `### Frameworks & Libraries\n\n`;
      techStack.frameworks.forEach(fw => {
        markdown += `- ${fw}\n`;
      });
      markdown += `\n`;
    }

    if (techStack.tools.length > 0) {
      markdown += `### Tools & Platforms\n\n`;
      techStack.tools.forEach(tool => {
        markdown += `- ${tool}\n`;
      });
      markdown += `\n`;
    }

    if (techStack.infrastructure.length > 0) {
      markdown += `### Infrastructure\n\n`;
      techStack.infrastructure.forEach(infra => {
        markdown += `- ${infra}\n`;
      });
      markdown += `\n`;
    }

    if (
      techStack.languages.length === 0 &&
      techStack.frameworks.length === 0 &&
      techStack.tools.length === 0 &&
      techStack.infrastructure.length === 0
    ) {
      markdown += `*Tech stack information not found*\n\n`;
    }

    markdown += `---\n\n`;

    // Leadership
    markdown += `## 👥 Leadership Team\n\n`;
    if (leadership.length > 0) {
      leadership.forEach(leader => {
        markdown += `### ${leader.name}\n\n`;
        markdown += `**${leader.title}**\n\n`;
        if (leader.bio) {
          markdown += `${leader.bio}\n\n`;
        }
        if (leader.linkedin) {
          markdown += `[LinkedIn Profile](${leader.linkedin})\n\n`;
        }
      });
    } else {
      markdown += `*Leadership information not found*\n\n`;
    }

    markdown += `---\n\n`;

    // Competitors
    markdown += `## 🏢 Competitors\n\n`;
    if (competitors.length > 0) {
      competitors.forEach(competitor => {
        markdown += `### ${competitor.name}\n\n`;
        if (competitor.description) {
          markdown += `${competitor.description}\n\n`;
        }
        if (competitor.website) {
          markdown += `- **Website:** ${competitor.website}\n\n`;
        }
      });
    } else {
      markdown += `*Competitor information not found*\n\n`;
    }

    markdown += `---\n\n`;

    // Footer
    markdown += `*Report generated on ${researchDate} using automated research tools*\n`;

    return markdown;
  }

  async saveReport(report: CompanyResearchReport, outputPath?: string): Promise<string> {
    const markdown = await this.generateMarkdown(report);
    const filename = outputPath || `${sanitizeFilename(report.companyInfo.name)}-research-${formatDate()}.md`;

    await writeFile(filename, markdown, 'utf-8');
    log(`Report saved to: ${filename}`, 'success');

    return filename;
  }

  async displayReport(report: CompanyResearchReport): Promise<void> {
    const markdown = await this.generateMarkdown(report);
    console.log('\n' + markdown);
  }
}

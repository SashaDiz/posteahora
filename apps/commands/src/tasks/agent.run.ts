import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AgentGraphService } from '@gitroom/nestjs-libraries/agent/agent.graph.service';

@Injectable()
export class AgentRun {
  constructor(private _agentGraphService: AgentGraphService) {}
  @Command({
    command: 'run:agent',
    describe: 'Run the agent',
  })
  async agentRun() {
    // TODO: Implement agent run command
    // The createGraph method doesn't exist on AgentGraphService
    // Use start(orgId: string, body: GeneratorDto) method instead
    console.log('Agent command is not yet implemented');
  }
}

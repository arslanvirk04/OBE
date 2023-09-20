import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';

@UseGuards(AuthGuard())
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('/addSession')
  create(@Body() body: any , @GetLoggedInUser()  loggedInUser: any) {
    return this.sessionsService.create(body, loggedInUser);
  }
  @Post('/addImportFileSession')
  addImportFileSession(@Body() body: any) {
    return this.sessionsService.addImportFileSession(body);
  }

  @Get('getAllSessions')
  findAll(@Body() body: any) {
    return this.sessionsService.findAll();
  }

  @Get('/getOneSession/:id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch('/updateSession/:id')
  update(@Param('id') id: string ) {
    return this.sessionsService.update(id);
  }

  @Delete('/deleteSession/:id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}

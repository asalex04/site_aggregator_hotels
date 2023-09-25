import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        // console.log(roles)
        console.log(user)
        console.log(request)
        const hasRole = () =>
            !!roles.find(item => item === user.role)
        console.log(hasRole())
        return user && user.roles && hasRole()
    }
}
import {Context, Hono, type TypedResponse} from "hono";
import { UsersRepository } from "./users.repository";

export class AuthController{
    constructor(private readonly repository: UsersRepository){}

    public routes(): Hono {
        return new Hono()
        .post("/register", ApplicationValidator.validate("json", userRegisterSchema), this.register.bind(this))
        .post("/auth", ApplicationValidator.validate("json", userAuthSchema), this.auth.bind(this))
        .get("/me", this.me.bind(this));
    }

    public async register(
        c: Context<
        ApplicationEnvironment,
        "/register",{
            out: {
                json: UserRegistryType;
            }
        }>
    ): Promise<TypedResponse<ApplicationResult<UserTokenType>>> {}

     public async auth(
        c: Context<
        ApplicationEnvironment,
        "/auth",{
            out: {
                json: UserAuthType;
            }
        }>
    ): Promise<TypedResponse<ApplicationResult<UserTokenType>>> {}

    public async me(c: Context<ApplicationEnvironment>): Promise<TypedResponse<ApplicationResult<UserTokenType>>>{
        return c.json({success: true, data: c.get("user")});
    }

    public async validate(c: Context<ApplicationEnvironment>, next: Next) {}
}
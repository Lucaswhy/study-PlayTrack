export default class User {
    
    constructor(
    readonly Id: Number,
    public Name: String,
    public Email: String,
    private Password: String,
    public Avatar?: String
    ){}

    

}
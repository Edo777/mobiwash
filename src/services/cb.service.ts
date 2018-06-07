export class CB{
   public callBacks = {};

   setCb(cb, key){
	this.callBacks[key] = cb;
   }
   
}
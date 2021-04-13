class Hud
{
    constructor(game){
        this.parent = game;
        this.canvas = document.getElementById('hud');
        this.context = this.canvas.getContext('2d');

        this.edges = [
            new Edge(this.canvas.width/2, 5, this.canvas.width, 10),
            new Edge(this.canvas.width/2, this.canvas.heigth-5, this.canvas.width, 10)
        ];
        
        for(let i=0; i<=22; i++){
            this.edges.push( new Edge(this.canvas.width/2, 20+(i*20), 10, 10) );
        }

        this.draw();
    }
    
    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
        
        this.edges.forEach(edge => this.parent.drawRectangle(this.context, edge, edge.color));
    }
}
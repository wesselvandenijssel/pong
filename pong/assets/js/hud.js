class Hud 
{
    constructor(game) {
        this.parent  = game;
        this.canvas  = document.getElementById('hud');
        this.context = this.canvas.getContext('2d');

        // Maak een array aan voor de randen (this.edges)
        // Maak in deze array nieuwe instances aan van Edge (new Edge)
        this.edges = [
            new Edge(this.canvas.width/2, 5, this.canvas.width, 10),
            new Edge(this.canvas.width/2, this.canvas.height-5, this.canvas.width, 10)
        ];

        for(let i=0; i<=22; i++) {
            this.edges.push( new Edge(this.canvas.width/2, 20+(i*20), 10, 10) );
        }

        this.score1 = new Label(this.canvas.width/2 - 30, 60, 10, 'white', '0', 'left');
        this.score2 = new Label(this.canvas.width/2 + 30, 60, 10, 'white', '0', 'right');

        this.draw();
    }

    addScore(playerId) {
        // Maak een variabele aan die het id van de speler die gescoord heeft gaat opslaan
        // Die waarde kunnen we gebruiken voor het uitlezen van de array
        const id = playerId===1 ? 0 : 1;
        // Maak een verwijzing naar de speler die waarvan de score met 1 moet worden opgehoogd
        // Gebruik this.parent om bij de variabele this.players te komen van Class Game
        this.parent.players[id].score++;
        // Zorg dat het juiste scoreveld (label) wordt geselecteerd en roep de functie update aan
        // Stuur de nieuwe score mee en zorg dat het een sctring-waarde is
        if(id===0) {
            this.score1.update( String( this.parent.players[id].score ) );
        }else if(id===1) {
            this.score2.update( String( this.parent.players[id].score ) );
        }
        // Roep de draw fucntie van Headsup-display aan
        this.draw();
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Teken hier de randen (this.edges) op het scherm
        // Gebruik de drawRectangle function uit Class Game
        this.edges.forEach(edge => this.parent.drawRectangle(this.context, edge, edge.color));  

        //console.log( this.test.rectangles.length );

        for(let r=0; r<this.score1.rectangles.length; r++) {
            let rectangle = this.score1.rectangles[r];    
            this.parent.drawRectangle(this.context, rectangle, rectangle.color);
        }
        
        for(let r=0; r<this.score2.rectangles.length; r++) {
            let rectangle = this.score2.rectangles[r];    
            this.parent.drawRectangle(this.context, rectangle, rectangle.color);
        }
    }
}
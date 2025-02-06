const app = Vue.createApp({
    data(){
        return{
            monsterHealth: 100,
            playerHealth: 100,
            clickCount: 0,
            winner: null,
            logs: [],
        }
        
    },
    watch: {
        monsterHealth(value){
            if(value == 0 && this.playerHealth == 0){
                this.winner = "It's draw!";
            }
            if(value == 0){
                this.winner = "You WON!";
            }
        },
        playerHealth(value){
            if(value == 0 && this.playerHealth == 0){
                this.winner = "It's draw!";
            }
            if(value == 0){
                this.winner = "You LOSE!";
            }
        },
        winner(value){
            if(value){this.logs.unshift(value)}
        },
        },
    methods: {
        playerAttack(){
            
            this.clickCount = ++this.clickCount %3;
            const damage =getRandomNum(5,12);
            this.monsterHealth = Math.max(this.monsterHealth - damage, 0);
            this.logs.unshift(`Player attack - ${damage}`)
            this.monsterAttack();
        },
        monsterAttack(){
            const damage =getRandomNum(8,15);
            this.playerHealth = Math.max(this.playerHealth - damage, 0);
            this.logs.unshift(`Monster attack - ${damage}`)
        },
        specialAttack(){
            this.clickCount = ++this.clickCount %3;
            const damage =getRandomNum(10,25);
            this.monsterHealth = Math.max(this.monsterHealth - damage, 0);
            this.logs.unshift(`Player special attack - ${damage}`)
            this.monsterAttack();},
        playerHeal(){
            const heal =getRandomNum(8,20);
            this.playerHealth = Math.min(this.playerHealth + heal,100);
            this.logs.unshift(`Player heal - ${heal}`)
            },
        surrender(){
            this.winner = "Monster won!";
            this.logs.unshift(`Player surrender`)
        },
        newGame(){
            this.monsterHealth= 100;
            this.playerHealth= 100;
            this.clickCount= 0;
            this.winner= null;
            this.logs=[];
        },
    },
})
function getRandomNum(min,max){
    return Math.floor(Math.random()* (max-min +1)) +5;
}

app.mount('#game')
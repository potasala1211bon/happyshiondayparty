class EndingScene extends Phaser.Scene {

    constructor() {
        super("ending");
    }

    init(data) {
        if(data.score != undefined)
            this.score = data.score;
        else
            this.score = 0;
    }

    create() {
        
        // background
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.add.image(445, 980, "french-fries").angle = 5;
        this.add.image(395, 980, "french-fries").angle = 355;
        this.add.image(335, 980, "french-fries").angle = 350;
        this.candy = [
            this.add.image(280, 990, "candy"), 
            this.add.image(280, 1010, "candy"), 
            this.add.image(325, 1010, "candy"), 
            this.add.image(370, 1010, "candy")
        ];
        this.candy[0].angle = 180;
        this.candy[1].angle = 270;
        this.candy[2].angle = 200;
        this.candy.forEach(element => {
            element.setScale(0.8);
        });
        this.add.image(470, 1005, "burger_drink");
        this.add.image(420, 1005, "burger_drink");

        // SFX
        this.buttonSFX = this.sound.add("select");

        // audio icon
        var tag = (audioOn)? "openAudio" : "mute";
        this.audioIcon = this.add.image(config.width-50, 50, tag).setOrigin(0.5,0.5);
        this.audioIcon.setInteractive();
        this.audioIcon.on('pointerover', () => {
            this.audioIcon.setScale(1.2);
        });
        this.audioIcon.on('pointerout', () => {
            this.audioIcon.setScale(1.0);
        });
        this.audioIcon.on('pointerup', () => {
            audioOn = !audioOn;
            if(audioOn) {
                this.audioIcon.setTexture('openAudio');
            }
            else this.audioIcon.setTexture('mute');
            bgmObj.mute = !audioOn;
        });

        // hina neko
        this.player = this.add.sprite(config.width/2 + 250, config.height-370, "celebrate_neko");
        this.player.play("celebrate_anim");
        // hina neko
        this.player2 = this.add.sprite(config.width/2 - 240, config.height-370, "celebrate_neko");
        this.player2.play("celebrate_anim");
        this.player2.flipX = true;

        
        // back button
        this.backBtn = this.add.sprite(config.width/2, config.height/2+138, "button").setOrigin(0.5, 0.5);
        this.backBtn.setInteractive();
        this.backLabel = this.add.text(config.width/2, config.height/2+148, 'BACK', {
            fontFamily: 'Flatwheat',
            fontSize: 50,
            align: 'center',
            color: '#606060'
        }).setOrigin(0.5, 0.5);
        this.backBtn.on('pointerover', () => {
            this.backBtn.setTexture("button_hover");
            this.backLabel.setColor('#ffffff');
        });
        this.backBtn.on('pointerout', () => {
            this.backBtn.setTexture("button");
            this.backLabel.setColor('#606060');
        });
        this.backBtn.on('pointerup', () => {
            if(audioOn) this.buttonSFX.play();
            this.scene.start("title");
        });

        // UI text
        this.titleLabel = this.add.text(config.width/2, 150, 'Congratulations!', {
            fontFamily: 'Flatwheat',
            fontSize: 80,
            align: 'center',
            strokeThickness: 5,
            stoke: '#949494'
        }).setOrigin(0.5, 0.5).setColor('#606060');

        this.yourScoreLabel = this.add.text(config.width/2-150, 275, 'Your score is...', {
            fontFamily: 'Flatwheat',
            fontSize: 40,
            align: 'center',
            strokeThickness: 1,
            stoke: '#fff'
        }).setOrigin(0.5, 0.5);

        this.scoreLabel = this.add.text(config.width/2, 430, ''+this.score, {
            fontFamily: 'Flatwheat',
            fontSize: 150,
            align: 'center',
            color: '#3b6668',
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        }).setOrigin(0.5, 0.5);

        // social buttons
        this.fbBtn = this.add.image(config.width/2 - 150, 650, "fb");
        this.fbBtn.setInteractive();
        this.fbBtn.on('pointerover', () => {
            this.fbBtn.setScale(1.2);
        });
        this.fbBtn.on('pointerout', () => {
            this.fbBtn.setScale(1.0);
        });
        this.fbBtn.on('pointerup', () => {
            if(audioOn) this.buttonSFX.play();
            window.open("https://www.facebook.com/sharer/sharer.php?u=https://potasala1211bon.github.io/happyshiondayparty/&quote=I%20got%20"+
            this.score+"%20points%20in%20Happy%20Shion%20Day%20Party!" +encodeURIComponent("\n#HAPPYSHIONDAY\n#HAPPYSIONDAY\n#鶴房汐恩誕生祭"),
            "_blank", "toolbar=0,status=0");
        });
        this.twitterBtn = this.add.image(config.width/2-50, 650, "twitter");
        this.twitterBtn.setInteractive();
        this.twitterBtn.on('pointerover', () => {
            this.twitterBtn.setScale(1.2);
        });
        this.twitterBtn.on('pointerout', () => {
            this.twitterBtn.setScale(1.0);
        });
        this.twitterBtn.on('pointerup', () => {
            if(audioOn) this.buttonSFX.play();
            window.open("https://twitter.com/intent/tweet?text=I%20got%20"+
                this.score+"%20points%20in%20Happy%20Shion%20Day%20Party!"+
                encodeURIComponent('\nhttps://potasala1211bon.github.io/happyshiondayparty/\n#HAPPYSHIONDAY\n#HAPPYSIONDAY\n#鶴房汐恩誕生祭'),
            "_blank", "toolbar=0,status=0");
        });
        this.plurkBtn = this.add.image(config.width/2 + 50, 650, "plurk");
        this.plurkBtn.setInteractive();
        this.plurkBtn.on('pointerover', () => {
            this.plurkBtn.setScale(1.2);
        });
        this.plurkBtn.on('pointerout', () => {
            this.plurkBtn.setScale(1.0);
        });
        this.plurkBtn.on('pointerup', () => {
            if(audioOn) this.buttonSFX.play();
            if(this.sys.game.device.input.touch) {
                window.open(encodeURI("https://www.plurk.com/?qualifier=shares&status=https://potasala1211bon.github.io/happyshiondayparty/"+
                "\nI got "+this.score+" points in Happy Shion Day Party!\n#HAPPYSHIONDAY\n#HAPPYSIONDAY\n#鶴房汐恩誕生祭"));
            }
            else {
                window.open('https://www.plurk.com/?qualifier=shares&status='.concat(encodeURIComponent('https://potasala1211bon.github.io/happyshiondayparty/')).
                concat(encodeURIComponent("\nI got "+this.score+" points in Happy Shion Day Party!\n#HAPPYSHIONDAY\n#HAPPYSIONDAY\n#鶴房汐恩誕生祭")));
            }
        });
        this.weiboBtn = this.add.image(config.width/2 + 150, 650, "weibo");
        this.weiboBtn.setInteractive();
        this.weiboBtn.on('pointerover', () => {
            this.weiboBtn.setScale(1.2);
        });
        this.weiboBtn.on('pointerout', () => {
            this.weiboBtn.setScale(1.0);
        });
        this.weiboBtn.on('pointerup', () => {
            if(audioOn) this.buttonSFX.play();
            window.open('https://service.weibo.com/share/share.php?title='.
            concat(encodeURIComponent("\nI got "+this.score+" points in Happy Shion Day Party!\n##HAPPYSHIONDAY\n#HAPPYSIONDAY\n#鶴房汐恩誕生祭")).
            concat("&url=https://potasala1211bon.github.io/happyshiondayparty/&source=bshare&retcode=0"))
        });

        this.shareLabel = this.add.text(config.width/2, 580, 'SHARE', {
            fontFamily: 'Flatwheat',
            fontSize: 30,
            align: 'center',
            color: '#3b6668',
            boundsAlignH: "center", 
            boundsAlignV: "middle"
        }).setOrigin(0.5, 0.5);
    }

}


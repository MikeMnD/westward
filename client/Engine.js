/**
 * Created by Jerome on 26-06-17.
 */
import AbilitiesPanel from './AbilitiesPanel'
import AbilityPanel from './AbilityPanel'
import BattleEquipmentPanel from './BattleEquipmentPanel'
import Animal from './Animal'
import BattleManager from './BattleManager'
import BattleTile from './BattleTile'
import BigButton from './BigButton'
import BuildingTitle from './BuildingTitle'
import BuildPanel from './BuildPanel'
import Capsule from './Capsule'
import Boot from './Boot';
import Building from './Building'
import CharacterPanel from './CharacterPanel'
import ChatPanel from './ChatPanel'
import Chunk from './Chunk'
import Civ from './Civ'
import ClassMiniPanel from './ClassMiniPanel'
import Client from './Client';
import ConstructionPanel from './ConstructionPanel'
import CraftingPanel from './CraftingPanel'
import EquipmentPanel from './EquipmentPanel'
import Hero from './Hero'
import {HighlightPipeline, HollowPipeline} from './shaders'
import InfoPanel from './InfoPanel'
import Inventory from '../shared/Inventory'
import InventoryPanel from './InventoryPanel'
import Item from './Item'
import ItemActionPanel from './ItemActionPanel'
import JournalPanel from './JournalPanel'
import MapPanel from './MapPanel'
import Menu from './Menu'
import menuIcon from './menuIcon';
import MiniMap from './MiniMap'
import MissionsPanel from './MissionsPanel'
import Panel from './Panel'
import Pathfinder from '../shared/Pathfinder'
import PFUtils from '../shared/PFUtils'
import Player from './Player'
import PricesPanel from './PricesPanel'
import ProductionPanel from './ProductionPanel'
import RecipesPanel from './RecipesPanel'
import RegionStatusPanel from './RegionStatusPanel'
import Remains from './Remains'
import RepairPanel from './RepairPanel'
import RespawnPanel from './RespawnPanel'
import RestPanel from './RestPanel'
import ShopInventoryPanel from './ShopInventoryPanel'
import {ShopPanel, ShopGoldPanel} from './ShopPanel'
import {SpaceMap} from '../shared/SpaceMap';
import StatsPanel from './StatsPanel'
import UI from './UI'
import Utils from '../shared/Utils'
import World from '../shared/World';

import animalsData from '../assets/data/animals.json'
import buildingsData from '../assets/data/buildings.json'
import regionsData from '../assets/data/regions.json'

var Engine = {
    // TODO: Move to conf?
    tileWidth: 32,
    tileHeight: 32,
    viewWidth: 32, // tiles; TODO: conf
    viewHeight: 18, // tiles

    markerDepth: 1,
    buildingsDepth: 2,
    playersDepth: 2,
    bubbleDepth: 11,

    UIDepth: 12,
    UIElementsDepth: 13,
    UIContentDepth: 14,
    UITextDepth: 15,

    tooltipDepth: 16,
    tooltipElementsDepth: 17,
    tooltipTextDepth: 18,

    // TODO: Move to conf
    maxPathLength: 36,

    debugMarker: true,
    debugCollisions: false,
    dummyUI: false,

    key: 'game', // key of the scene, for Phaser
    plugins: ['Clock','DataManagerPlugin','InputPlugin','Loader','TweenManager'], // 'LightsPlugin'
    playerIsInitialized: false
};

Engine.preload = function() {
    Engine.useTilemaps = false;

    this.load.atlas('tileset', 'assets/tilesets/tileset.png', 'assets/tilesets/tileset.json');

    this.load.atlas('remains', 'assets/sprites/remains.png','assets/sprites/remains.json');

    // Characters
    this.load.spritesheet('enemy', 'assets/sprites/enemy.png',{frameWidth:64,frameHeight:64});
    this.load.spritesheet('hero', 'assets/sprites/newhero.png',{frameWidth:64,frameHeight:64}); // http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#


    this.load.spritesheet('graywolf', 'assets/sprites/animals/graywolf.png',{frameWidth:43,frameHeight:32});
    this.load.spritesheet('blackwolf', 'assets/sprites/animals/blackwolf.png',{frameWidth:43,frameHeight:32});
    this.load.spritesheet('whitewolf', 'assets/sprites/animals/whitewolf.png',{frameWidth:43,frameHeight:32});
    this.load.spritesheet('bears', 'assets/sprites/animals/bears.png',{frameWidth:56,frameHeight:56});
    this.load.spritesheet('butterfly', 'assets/sprites/animals/butterfly.png',{frameWidth:9,frameHeight:7});

    // ###################

    // Misc
    this.load.spritesheet('3grid', 'assets/sprites/3grid.png',{frameWidth:32,frameHeight:32});
    this.load.spritesheet('bubble', 'assets/sprites/bubble2.png',{frameWidth:5,frameHeight:5});
    this.load.spritesheet('faces', 'assets/sprites/faces.png',{frameWidth:32,frameHeight:32});
    this.load.spritesheet('footsteps', 'assets/sprites/footstepssheet.png',{frameWidth:16,frameHeight:16});
    this.load.spritesheet('marker', 'assets/sprites/marker.png',{frameWidth:32,frameHeight:32});

    // Animations
    this.load.spritesheet('sword_anim', 'assets/sprites/Sword1.png',{frameWidth:96,frameHeight:96});
    this.load.spritesheet('explosion', 'assets/sprites/explosion.png',{frameWidth:100,frameHeight:100});

    // Buildings
    this.load.atlas('buildings_sprites', 'assets/sprites/buildings.png', 'assets/sprites/buildings.json');

    // Icons
    this.load.atlas('mapicons', 'assets/sprites/mapicons.png', 'assets/sprites/mapicons.json');
    this.load.atlas('battleicons', 'assets/sprites/battleicons.png', 'assets/sprites/battleicons.json');
    this.load.atlas('buildingsicons', 'assets/sprites/buildingsicons.png', 'assets/sprites/buildingsicons.json');

    this.load.atlas('items', 'assets/sprites/items.png', 'assets/sprites/items.json');
    this.load.atlas('items2', 'assets/sprites/resources_full.png', 'assets/sprites/resources_full.json');
    this.load.atlas('items_gr', 'assets/sprites/items_gr.png', 'assets/sprites/items.json');
    this.load.atlas('items2_gr', 'assets/sprites/resources_full_gr.png', 'assets/sprites/resources_full.json');

    // Misc
    this.load.image('bug', 'assets/sprites/bug.png');
    this.load.atlas('orientation', 'assets/sprites/orientation.png', 'assets/sprites/orientation.json');
    this.load.image('tail', 'assets/sprites/tail.png');
    this.load.image('scrollbgh', 'assets/sprites/scroll.png');
    this.load.image('bigbg', 'assets/sprites/bigbg.png');
    this.load.image('bigbg_mask', 'assets/sprites/bigbg_mask.png');
    this.load.image('worldmap', 'maps/worldmap.png');

    // SFX
    Engine.audioFiles = [];
    this.load.audio('arrow','assets/sfx/arrow.wav');
    this.load.audio('arrow_miss','assets/sfx/arrow_miss.wav');
    this.load.audio('bomb','assets/sfx/bomb.wav');
    this.load.audio('footsteps','assets/sfx/footsteps.wav');
    this.load.audio('sellbuy','assets/sfx/sell_buy_item.wav');
    this.load.audio('speech','assets/sfx/speech.ogg');
    this.load.audio('inventory','assets/sfx/leather_inventory.wav');
    this.load.audio('crafting','assets/sfx/metal-clash.wav');
    this.load.audio('page_turn','assets/sfx/turn_page.wav');
    this.load.audio('page_turn2','assets/sfx/turn_page2.wav');
    this.load.audio('page_turn3','assets/sfx/turn_page3.wav');
    this.load.audio('book','assets/sfx/book.wav');
    this.load.audio('equip','assets/sfx/chainmail1.wav');
    this.load.audio('cloth','assets/sfx/cloth.wav');
    this.load.audio('woodsmall','assets/sfx/wood-small.wav');
    this.load.audio('alchemy','assets/sfx/alchemy.wav');
    this.load.audio('birds1','assets/sfx/birds1.wav');
    this.load.audio('birds2','assets/sfx/birds2.wav');
    this.load.audio('birds3','assets/sfx/birds3.wav');
    this.load.audio('bird','assets/sfx/bird.wav');
    this.load.audio('cricket','assets/sfx/cricket.wav');
    this.load.audio('raven','assets/sfx/raven.wav');
    this.load.audio('bubbles','assets/sfx/bubbles.wav');
    this.load.audio('powder','assets/sfx/powder.wav');
    this.load.audio('clank','assets/sfx/clank.wav');
    this.load.audio('sword','assets/sfx/sword.wav');
    this.load.audio('soft','assets/sfx/soft.ogg');
    this.load.audio('hit','assets/sfx/hit.wav');
    this.load.audio('wolfambient','assets/sfx/wolfambient1.wav');
    this.load.audio('wolfattack1','assets/sfx/wolfattack1.wav');
    this.load.audio('wind1','assets/sfx/wind1.wav');
    this.load.audio('wind2','assets/sfx/wind2.wav');
    this.load.audio('wind3','assets/sfx/wind3.wav');

    if(Client.tutorial) this.load.json('tutorials', 'assets/data/tutorials.json');
};

Engine.entityManager = {
    entities: [],
    constructors: {},
    maps: {},
    pools: {},
    displayLists: {},

    registerEntityType: function(key,constructor,map){
        Engine.entityManager.entities.push(key);
        Engine.entityManager.constructors[key] = constructor;
        Engine.entityManager.maps[key] = map;
        Engine.entityManager.pools[key] = [];
        Engine.entityManager.displayLists[key] = new Set();
    },

    addToDisplayList: function(entity){
        Engine.entityManager.displayLists[entity.entityType].add(entity.id);
    },

    addToPool: function(entity){
        Engine.entityManager.pools[entity.entityType].push(entity);
    },

    removeFromDisplayList: function(entity){
        Engine.entityManager.displayLists[entity.entityType].delete(entity.id);
    }
};

function Pool(type,texture,constructor){
    this.type = type;
    this.texture = texture;
    this.constructor = constructor;
    this.reserve = [];
}

Pool.prototype.getNext = function(){
    if(this.reserve.length > 0) return this.reserve.shift();
    //console.log('creating new element');
    var element;
    switch(this.type){
        case 'sprite':
            element = Engine.scene.add.sprite(0,0,this.texture);
            break;
        case 'image':
            element = Engine.scene.add.image(0,0,this.texture);
            break;
        case 'text':
            element = Engine.scene.add.text(0,0, '');
            break;
        case 'custom':
            return new this.constructor();
        default:
            console.warn('no type defined');
            break;
    }
    var _pool = this;
    element.recycle = function(){
        this.setVisible(false);
        _pool.recycle(this);
    };
    return element;
};

Pool.prototype.recycle = function(element){
    //console.warn('recycling element');
    this.reserve.push(element);
};

Engine.create = function(){
    Engine.scene = this.scene.scene;

    var masterData = Boot.masterData;
    World.readMasterData(masterData);
    Engine.mapDataLocation = Boot.mapDataLocation;

    Engine.tilesetData = {};
    Engine.tilesetData.atlas = Engine.scene.cache.json.get('tileset').frames;
    Engine.tilesetData.config = Engine.scene.cache.json.get('tileset').config;
    Engine.tilesetData.shorthands = Engine.scene.cache.json.get('tileset').shorthands;

    Engine.chunks = {}; // holds references to the containers containing the chunks
    Engine.displayedChunks = [];
    Engine.mapDataCache = {};

    var animations = ['explosion','sword'];
    Engine.animationsPools = {};
    animations.forEach(function(key){
        Engine.animationsPools[key] = new Pool('sprite',key);
    });
    Engine.footprintsPool = new Pool('image','footsteps');

    Engine.imagePool = new Pool('image','items');
    Engine.imagePool2 = new Pool('image','items2');
    // TODO why? - why not imageItemPool, imageItemPool2

    Engine.arrowsPool = new Pool('image','items');
    Engine.bombsPool = new Pool('image','items2');
    Engine.textPool = new Pool('text');

    Engine.players = {}; // player.id -> player object
    Engine.animals = {}; // animal.id -> building object
    Engine.buildings = {}; // building.id -> building object
    Engine.items = {};
    Engine.remains = {};
    Engine.civs = {};
    Engine.battleCells = {}; // cell.id -> cell object
    Engine.battleCellsMap = new SpaceMap();
    Engine.entityManager.registerEntityType('player',Player,Engine.players);
    Engine.entityManager.registerEntityType('animal',Animal,Engine.animals);
    Engine.entityManager.registerEntityType('building',Building,Engine.buildings);
    Engine.entityManager.registerEntityType('item',Item,Engine.items);
    Engine.entityManager.registerEntityType('cell',BattleTile,Engine.battleCells);
    Engine.entityManager.registerEntityType('civ',Civ,Engine.civs);
    Engine.entityManager.registerEntityType('remain',Remains,Engine.remains);



    Engine.debug = true;
    Engine.showHero = true;
    Engine.showGrid = false;
    Engine.qtQuads = []; // for debugging

    Engine.camera = Engine.scene.cameras.main;
    Engine.camera.setBounds(0,0,Engine.worldWidth*Engine.tileWidth,Engine.worldHeight*Engine.tileHeight);

    Engine.createMarker();
    Engine.createAnimations();

    Engine.dragging = false;
    Engine.interrupt = false;
    Engine.scene.input.setTopOnly(false);
    Engine.scene.input.on('pointerdown', Engine.handleDown);
    Engine.scene.input.on('pointerup', Engine.handleClick);
    Engine.scene.input.on('pointermove', Engine.trackMouse);

    // TODO: move these to classes
    Engine.scene.input.setPollAlways();
    Engine.scene.input.on('pointerover', Engine.handleOver);
    Engine.scene.input.on('pointerout', Engine.handleOut);
    Engine.scene.input.on('drag', Engine.handleDrag);
    Engine.scene.input.keyboard.on('keydown', Engine.handleKeyboard);

    Engine.collisions = new SpaceMap();
    Engine.overlay = new SpaceMap();
    Engine.pathFinder = new Pathfinder(Engine.collisions,Engine.maxPathLength);

    Engine.resources = new SpaceMap();

    Engine.inMenu = false;
    UI.inPanel = false;
    Engine.dead = false;
    Engine.currentMenu = null;
    UI.currentPanel = null;

    Engine.useBlitters = false;
    if(Engine.useBlitters){
        /* * Blitters:
    * - 1 for ground tileset, depth 0
    * - 1 for trees tileset, depth 2
    * - 1 for canopies, depth 6*/
        Engine.blitters = [];
        Engine.blitters.push(Engine.scene.add.blitter(0,0,'ground_tiles').setDepth(0));
        Engine.blitters.push(Engine.scene.add.blitter(0,0,'trees').setDepth(2));
        Engine.blitters.push(Engine.scene.add.blitter(0,0,'trees').setDepth(4));
    }

    Engine.getGameInstance().renderer.addPipeline('highlight', new HighlightPipeline(Engine.getGameInstance()));
    Engine.getGameInstance().renderer.addPipeline('hollow_items', new HollowPipeline(Engine.getGameInstance()));
    Engine.getGameInstance().renderer.addPipeline('hollow_moving', new HollowPipeline(Engine.getGameInstance()));

    Engine.created = true;
    Engine.configEngine();
    Client.requestData();
};

Engine.getGameInstance = function(){
    return Engine.scene.sys.game;
};

// TODO: rename / remove
Engine.getGameConfig = function(){
    return Engine.getGameInstance().config;
};

Engine.createMarker = function(){
    Engine.marker = Engine.scene.add.sprite(0,0,'marker',0);
    Engine.marker.alpha = 0.8;
    Engine.marker.depth = Engine.markerDepth;
    Engine.marker.setDisplayOrigin(0,0);
    Engine.marker.previousTile = {x:0,y:0};
    Engine.hideMarker();
};

// Called at the end of create(), data is received before the Engine scene starts
Engine.configEngine = function(){
    Engine.config = Client.gameConfig.config;
};

Engine.initWorld = function(data){
    /* data = initialization packet sent by server, contains the data from
    Player.initTrim() used in Hero.setUp()
    */
    //Engine.animalUpdates = new ListMap(); // debug purpose, remove
    Engine.firstSelfUpdate = true;

    console.log(data);
    //Engine.settlementsData = data.settlements;
    Engine.addHero(data);
    Engine.playerIsInitialized = true;
    Engine.updateEnvironment();

    Engine.makeUI();

    Engine.setlCapsule.setText(regionsData[data.region].name);

    Client.emptyQueue(); // Process the queue of packets from the server that had to wait while the client was initializing
    Engine.showMarker();
    if(Engine.miniMap) Engine.miniMap.display();

    if(Client.isNewPlayer() && !Client.tutorial) {
        var w = 400;
        var h = 290;
        var panel = new InfoPanel((UI.getGameWidth() - w) / 2, (UI.getGameHeight() - h) / 2, w, h, 'Welcome');
        panel.setWrap(20);

        var x = 15;
        var y = 20;
        UI.textsData['welcome'].forEach(function(t){
            var txt = panel.addText(x,y,t);
            y += txt.height+3;
        });

        panel.addBigButton('Got it');
        panel.display();
    }

    if(Client.tutorial) TutorialManager.boot(1);

    // todo: move all to dedicated sound manager
    /*Engine.lastOrientationSound = 0;
    // todo: move to JSON file (+ config for delay)
    Engine.ambientSounds([
        {name:'birds1',volume:1},
        {name:'birds2',volume:1},
        {name:'birds3',volume:1},
        {name:'bird',volume:1},
        {name:'cricket',volume:1}
    ], 10000);
    Engine.ambientSounds([
        {name:'wind1',volume:1},
        {name:'wind2',volume:1},
        {name:'wind3',volume:1}
    ],17000);*/
};

Engine.ambientSounds = function(sounds,interval){
    setInterval(function(){
        var sound = Utils.randomElement(sounds);
        Engine.scene.sound.add(sound.name).setVolume(sound.volume).play();
    },interval);
};

Engine.playLocalizedSound = function(sound,maxVolume,location){
    var volume = maxVolume;
    var dist = Utils.manhattan(location,{x:Engine.player.tileX,y:Engine.player.tileY});
    var hearingDistance = Engine.config.hearingDistance;
    if(dist < hearingDistance){
        var d = hearingDistance-dist;
        //volume = Math.round(Utils.clamp(d/Engine.hearingDistance,0,1)*maxVolume);
        volume = Utils.clamp(d/hearingDistance,0,1)*maxVolume;
        Engine.scene.sound.add(sound).setVolume(volume).play();
    }
};

Engine.createAnimations = function(){
    Engine.createHumanoidAnimations('player','hero');
    Engine.createHumanoidAnimations('enemy','enemy');

    Engine.createWolfAnimations('graywolf');
    Engine.createWolfAnimations('blackwolf');
    Engine.createWolfAnimations('whitewolf');

    // Bear
    Engine.createAnimation('bear_move_down','bears',9,11,10,true);
    Engine.createAnimation('bear_move_left','bears',21,23,10,true);
    Engine.createAnimation('bear_move_right','bears',33,35,10,true);
    Engine.createAnimation('bear_move_up','bears',45,47,10,true);

    Engine.createAnimation('bear_rest_down','bears',9,9);
    Engine.createAnimation('bear_rest_left','bears',21,21);
    Engine.createAnimation('bear_rest_right','bears',33,33);
    Engine.createAnimation('bear_rest_up','bears',45,45);

    Engine.scene.anims.create({
        key: 'sword',
        frames: Engine.scene.anims.generateFrameNumbers('sword_anim', { start: 0, end: 2}),
        frameRate: 15,
        hideOnComplete: true,
        // TODO: test if callback still called after v3.3
         onComplete: function(sprite){
            sprite.recycle();
        }
    });

    Engine.scene.anims.create({
        key: 'explosion',
        frames: Engine.scene.anims.generateFrameNumbers('explosion', { start: 0, end: 80}),
        frameRate: 75,
        hideOnComplete: true,
        // TODO: test if callback still called after v3.3
        onComplete: function(sprite){
            sprite.recycle();
        }
    });

    Engine.scene.anims.create({
        key: 'player_death',
        frames: Engine.scene.anims.generateFrameNumbers('hero', { start: 260, end: 265}),
        frameRate: 10
    });

    Engine.scene.anims.create({
        key: 'butterflap',
        frames: Engine.scene.anims.generateFrameNumbers('butterfly', { start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });
};

Engine.createHumanoidAnimations = function(key, texture){
    // TODO: don't hardcode, store in JSON of find a way to infer it
    // (standardize all spritesheets?)
    Engine.createAnimation(key+'_move_right',texture,143,151,15,10,true);
    Engine.createAnimation(key+'_move_up',texture,104,112,15,10,true);
    Engine.createAnimation(key+'_move_down',texture,130,138,15,10,true);
    Engine.createAnimation(key+'_move_left',texture,117,125,15,10,true);

    Engine.createAnimation(key+'_attack_right',texture,195,200,15,false,true);
    Engine.createAnimation(key+'_attack_down',texture,182,187,15,false,true);
    Engine.createAnimation(key+'_attack_left',texture,169,174,15,false,true);
    Engine.createAnimation(key+'_attack_up',texture,156,161,15,false,true);

    Engine.createAnimation(key+'_bow_right',texture,247,259,15,false,true);
    Engine.createAnimation(key+'_bow_down',texture,234,246,15,false,true);
    Engine.createAnimation(key+'_bow_left',texture,221,233,15,false,true);
    Engine.createAnimation(key+'_bow_up',texture,208,220,15,false,true);

    Engine.createAnimation(key+'_rest_down',texture,130,130);
    Engine.createAnimation(key+'_rest_left',texture,117,117);
    Engine.createAnimation(key+'_rest_right',texture,143,143);
    Engine.createAnimation(key+'_rest_up',texture,104,104);
};

Engine.createWolfAnimations = function(key){
    Engine.createAnimation(key+'_move_down',key,0,2,10,true);
    Engine.createAnimation(key+'_move_left',key,7,9,10,true);
    Engine.createAnimation(key+'_move_right',key,14,16,10,true);
    Engine.createAnimation(key+'_move_up',key,21,23,10,true);

    Engine.createAnimation(key+'_attack_down',key,28,34,15,false,true);
    Engine.createAnimation(key+'_attack_left',key,35,41,15,false,true);
    Engine.createAnimation(key+'_attack_right',key,42,48,15,false,true);
    Engine.createAnimation(key+'_attack_up',key,49,55,15,false,true);

    Engine.createAnimation(key+'_die_down',key,56,58);
    Engine.createAnimation(key+'_die_left',key,63,65);
    Engine.createAnimation(key+'_die_right',key,70,72);
    Engine.createAnimation(key+'_die_up',key,77,79);

    Engine.createAnimation(key+'_rest_down',key,1,1);
    Engine.createAnimation(key+'_rest_left',key,8,8);
    Engine.createAnimation(key+'_rest_right',key,15,15);
    Engine.createAnimation(key+'_rest_up',key,22,22);
};

Engine.createAnimation = function(key,texture,start,end,rate,loop,revert){
    rate = rate || 10;
    var config = {
        key: key,
        frames: Engine.scene.anims.generateFrameNumbers(texture, { start: start, end: end}),
        frameRate: rate
    };
    if(loop) config.repeat = -1;
    if(revert) config.frames.push({key:texture, frame:start}); // adds the initial frame as the last frame
    Engine.scene.anims.create(config);
};

Engine.toggleChatBar = function(){
    if(Engine.inMenu && !BattleManager.inBattle) return;
    Engine.chatBar.toggle();
};

Engine.manageDeath = function(){
    Engine.dead = true;
};

Engine.manageRespawn = function(){
    Engine.showMarker();
    Engine.dead = false;
    Engine.updateAllOrientationPins();
};

Engine.updateAllOrientationPins = function(){
    Engine.entityManager.displayLists['animal'].forEach(function(aid){
        Engine.animals[aid].manageOrientationPin();
    });
    Engine.entityManager.displayLists['civ'].forEach(function(cid){
        Engine.civs[cid].manageOrientationPin();
    });
    Engine.orientationPins = {
        'top': {},
        'left': {},
        'right': {},
        'bottom': {}
    };
    Engine.entityManager.displayLists['item'].forEach(function(iid){
        Engine.items[iid].manageOrientationPin();
    });
    // Engine.pruneOrientationPins();
    Engine.entityManager.displayLists['player'].forEach(function(pid){
        Engine.players[pid].manageOrientationPin();
    });
};

Engine.pruneOrientationPins = function(){
    // TODO: complete
    for(var side in Engine.orientationPins){
        if(side != 'right') continue; // TODO: remove
        for(var item in Engine.orientationPins[side]){
            var pins = Engine.orientationPins[side];
            for(var i = 0; i < pins.length; i++){
                var base = pins[i];
                for(var j = i+1; j < pins.length; j++) {
                    var other = pins[j];
                    // TODO: conf
                    var d = Math.abs(base.y - other.y);
                    console.warn(d);
                    if(d < 20){
                        other.hide();
                        pins.splice(j,1);
                        base += d/2;
                    }
                }
                // if(i >= pins.length) break;
            }
        }
    }
};

Engine.updateBehindness = function(){
    Engine.entityManager.displayLists['item'].forEach(function(iid){
        Engine.items[iid].manageBehindness();
    });
};

Engine.makeBuildingTitle = function(){
    Engine.buildingTitle = new BuildingTitle(512,10);
};

// #############################

function dummyRect(x,y,w,h,color){
    var rect = UI.scene.add.rectangle(x, y, w, h, (color || 0x6666ff));
    rect.setDepth(0).setScrollFactor(0).setOrigin(0);
    return rect;
}

function dummyText(x,y,txt,size,leftAlign){
    var t = UI.scene.add.text(x, y, txt, { font: size+'px belwe', fill: '#ffffff', stroke: '#000000', strokeThickness: 4 });
    t.setDepth(1).setScrollFactor(0);
    if(leftAlign){
        t.setOrigin(0);
    }else{
        t.setOrigin(0.5);
    }
    return t;
}

function dummyImage(x,y,frame){
    var img = UI.scene.add.sprite(x,y,'dummy',frame);
    img.setDepth(2).setScrollFactor(0);
    return img;
}

Engine.makeDummyUI = function(){
    var sceneW = 1024;
    var sceneH = 576;

    dummyRect(0,0,sceneW,32);

    var x = 8;
    dummyImage(x,8,'citizens');
    x += 8;
    var t = dummyText(x,0,'2/21',14,true);
    x += t.width+10;
    dummyImage(x,8,'meat');
    x += 8;
    t = dummyText(x,0,'150/250',14,true);
    x += t.width+10;
    dummyText(x,0,'Famine!',14,true);

    t = dummyText(sceneW/2,16,'New Beginning',16);
    dummyImage(t.x - t.width/2 - 10,16,'bell');
    dummyText(sceneW/2+60,25,'Lvl 3',14);

    //Engine.miniMap = new MiniMap(2);
    //dummyImage(sceneW-22,22,'UI','icon_holder');
    //dummyImage(sceneW-172,22,'UI','icon_holder');
    dummyImage(sceneW-22,22,'compass');

    var h = 32;
    dummyRect(0,sceneH-h,sceneW,h);

    dummyText(0,sceneH-h,'100/150   Tired   100/500   3/12',14,true);
    dummyRect(3,sceneH-(h/2)+2,200,10,0xef0000);

    dummyText(sceneW/2,sceneH-h/2,'This is a notification',14);
};

// #############################

function SettlementCapsule(x,y){
    this.slices = [];
    var w = 70;
    this.slices.push(UI.scene.add.tileSprite(x,y,w,24,'UI','capsule-middle').setOrigin(1,0));
    this.slices.push(UI.scene.add.sprite(x-w,y,'UI','capsule-left').setOrigin(1,0));
    this.text = UI.scene.add.text(x-w+10, y, '',
        { font: '16px belwe', fill: '#ffffff', stroke: '#000000', strokeThickness: 3 }
    ).setOrigin(1,0);
}

SettlementCapsule.prototype.setText = function(text){
    var tx = this.text.width;
    this.text.setText(text);
    this.slices[0].width = this.text.width + 60;
    this.slices[1].x = this.slices[0].x - (this.slices[0].width);///2) - (this.slices[1].width) - 30;
};

SettlementCapsule.prototype.display = function(){
    this.slices.forEach(function(slice){
        slice.setVisible(true);
    });
    this.text.setVisible(true);
};

SettlementCapsule.prototype.hide = function(){
    this.slices.forEach(function(slice){
        slice.setVisible(false);
    });
    this.text.setVisible(false);
};

Engine.toggleMenuIcons = function(){
    Engine.menuIcons.forEach(function(i){
        i.toggle();
    });
};

Engine.hideHUD = function(){
    if(Engine.miniMap) Engine.miniMap.hide();
    Engine.setlCapsule.hide();
    Engine.toggleMenuIcons();
};

Engine.displayHUD = function(){
    if(Engine.miniMap)  Engine.miniMap.display();
    Engine.setlCapsule.display();
    Engine.toggleMenuIcons();
};

Engine.hideCapsules = function(){
    Engine.lifeCapsule.hide();
    Engine.goldCapsule.hide();
    Engine.bagCapsule.hide();
    Engine.vigorCapsule.hide();
    Engine.foodCapsule.hide();
    Engine.face.setVisible(false);
    Engine.faceHolder.setVisible(false);
};

Engine.displayCapsules = function(){
    Engine.lifeCapsule.display();
    Engine.goldCapsule.display();
    Engine.bagCapsule.display();
    Engine.vigorCapsule.display();
    Engine.foodCapsule.display();
    Engine.face.setVisible(true);
    Engine.faceHolder.setVisible(true);
};

// Called after the Hero is set up
Engine.makeUI = function(){
    // TODO: make a zone with onpointerover = cursor is over UI, and make slices not interactive anymore
    //Engine.UIHolder = new UIHolder(1000,500,'right');

    var bug = UI.scene.add.image(Engine.getGameConfig().width-10,10,'bug');
    bug.setOrigin(1,0);
    bug.setScrollFactor(0);
    bug.setInteractive();
    bug.setDepth(10);

    bug.on('pointerup',Engine.snap);
    bug.on('pointerover',function(){
        UI.tooltip.updateInfo('free',{body:'Snap a pic of a bug'});
        UI.tooltip.display();
    });
    bug.on('pointerout',UI.tooltip.hide.bind(UI.tooltip));

    Engine.miniMap = new MiniMap();
    Engine.setlCapsule = new SettlementCapsule(950,3);

    var x = 23;
    var y = 19;
    Engine.faceHolder = UI.scene.add.sprite(x,y,'UI','facebg').setScrollFactor(0).setDepth(2);
    Engine.face = UI.scene.add.sprite(x,y,'faces',0).setScrollFactor(0).setDepth(3);

    Engine.lifeCapsule = new Capsule(UI.scene,37,3,'UI','heart');
    Engine.lifeCapsule.setHoverText(UI.tooltip,'Vitality',UI.textsData['health_help']);
    Engine.lifeCapsule.removeLeft();
    Engine.lifeCapsule.display();
    Engine.lifeCapsule.update = function(){
        this.setText(Engine.player.getStatValue('hp')+'/'+Engine.player.getStatValue('hpmax'));
    };

    Engine.goldCapsule = new Capsule(UI.scene,152,3,'UI','gold');
    Engine.goldCapsule.setHoverText(UI.tooltip,'Gold',UI.textsData['gold_help']);
    Engine.goldCapsule.display();
    Engine.goldCapsule.update = function(){
        this.setText(Engine.player.gold || 0); // TODO: add max
    };
    Engine.goldCapsule.update();

    Engine.bagCapsule = new Capsule(UI.scene,228,3,'UI','smallpack');
    Engine.bagCapsule.setHoverText(UI.tooltip,'Backpack',UI.textsData['backpack_help']);
    Engine.bagCapsule.display();
    Engine.bagCapsule.update = function(){
        this.setText(Engine.player.inventory.size+'/'+Engine.player.inventory.maxSize);
    };
    Engine.bagCapsule.update();

    Engine.vigorCapsule = new Capsule(UI.scene,50,30,'UI','goldenheart');
    Engine.vigorCapsule.setHoverText(UI.tooltip,'Vigor',UI.textsData['vigor_help']);
    Engine.vigorCapsule.display();
    Engine.vigorCapsule.update = function(){
        this.setText(Engine.player.getStatValue('vigor')+'%');
    };

    Engine.foodCapsule = new Capsule(UI.scene,140,30,'UI','bread');
    Engine.foodCapsule.setHoverText(UI.tooltip,'Food',UI.textsData['food_help']);
    Engine.foodCapsule.display();
    Engine.foodCapsule.update = function(){
        this.setText(Engine.player.getStatValue('food')+'%');
    };

    Engine.capsules = {
        update: function(){
            Engine.lifeCapsule.update();
            Engine.foodCapsule.update();
            Engine.vigorCapsule.update();
        }
    };
    Engine.capsules.update();

    Engine.makeBuildingTitle();

    var statsPanel = new StatsPanel(665,335,330,100,'Stats');
    statsPanel.addButton(300, 8, 'blue','help',null,'',UI.textsData['stats_help']);

    var mapPanel = Engine.makeMapPanel();

    // Todo: make a 'makerepairpanel()' method similar to 'makepricespanel()'?
    Engine.repairPanel = new RepairPanel(476,190,500,200,'Repair');
    Engine.repairPanel.addButton(500-16,-8,'red','close',Engine.repairPanel.hide.bind(Engine.repairPanel),'Close');
    Engine.repairPanel.addButton(460, 8, 'blue','help',null,'',UI.textsData['repair_help']);
    Engine.repairPanel.moveUp(3);
    Engine.repairAction = new ShopPanel(670,390,300,100,'Take');
    Engine.repairAction.addButton(300-16,-8,'red','close',Engine.repairAction.hide.bind(Engine.repairAction),'Close');
    Engine.repairAction.moveUp(2);

    Engine.menus = {
        // 'abilities': Engine.makeAbilitiesMenu(),
        'battle': Engine.makeBattleMenu(),
        'build': Engine.makeBuildMenu(),
        'character': Engine.makeCharacterMenu(),
        'construction': Engine.makeConstructionMenu(),
        'crafting': Engine.makeCraftingMenu(),
        'inventory': Engine.makeInventory(statsPanel),
        'map': Engine.makeMapMenu(mapPanel),
        'missions': Engine.makeRegionsMenu(mapPanel),
        //'messages': Engine.makeMessagesMenu(),
        'production': Engine.makeProductionMenu(),
        'respawn': Engine.makeRespawnMenu(),
        'rest': Engine.makeRestMenu(),
        'trade': Engine.makeTradeMenu(),
        'wip': Engine.makeWipMenu()
    };

    Engine.menuIcons = [];
    //Engine.addMenu(1004,140,'menu_crow',Engine.menus.messages,895,73);
    Engine.addMenu(967,150,'menu_map',Engine.menus.map,855,73);
    Engine.addMenu(922,150,'menu_backpack',Engine.menus.inventory,815,73);
    Engine.addMenu(884,130,'menu_dude',Engine.menus.character,775,73);
    Engine.addMenu(863,95,'menu_flag',Engine.menus.missions,735,73);
    Engine.addMenu(20,60,'shovel',Engine.menus.build,-100,60);

    Engine.makeBattleUI();

    var chatw = 230;
    var chath = 50;
    var chaty = Engine.getGameConfig().height - chath;
    Engine.chatBar = new ChatPanel(0,chaty,chatw,chath,'Chat');

    // TODO: make conditional to unread
    /*letter.tween = UI.scene.tweens.add(
        {
            targets: letter,
            y: '-=20',
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Quad.easeOut',
            onRepeat: function(_tween, _sprite){
                if(_sprite.flagForStop) _tween.stop();
            }
        }
    );*/
};



Engine.addMenu = function(x,y,icon,menu,tox,toy){
    Engine.menuIcons.push(new menuIcon(x,y,icon,menu,tox,toy));
};

Engine.makeBattleUI = function(){
    Engine.fightText = UI.scene.add.text(Engine.getGameConfig().width/2,50, 'Fight!',  { font: '45px belwe', fill: '#ffffff', stroke: '#000000', strokeThickness: 3 });
    Engine.fightText.setOrigin(0.5);
    Engine.fightText.setScrollFactor(0);
    Engine.fightText.setDepth(3);
    Engine.fightText.setVisible(false);
};

Engine.tweenFighText = function(){
    UI.scene.tweens.add(
        {
            targets: Engine.fightText,
            scaleX: 1,
            scaleY: 1,
            duration: 100,
            onStart: function(){
                Engine.fightText.setScale(10);
                Engine.fightText.setVisible(true);
            },
            onComplete: function(){
                setTimeout(function(){
                    Engine.fightText.setVisible(false);
                },1000);
            }
        }
    );
};

Engine.isProduced = function(item){
    return Engine.currentBuiling.produced.includes(parseInt(item));
};

Engine.handleBattleAnimation = function(data){
    var sprite = Engine.animationsPools[data.name].getNext();
    sprite.setVisible(false);
    sprite.setOrigin(0.5);
    var x = data.x*Engine.tileWidth;
    var y = data.y*Engine.tileHeight;
    sprite.setPosition(x,y);
    sprite.setDepth(5);
    sprite.on('animationstart',function(){
        var sound = data.sound || 'hit';
        Engine.playLocalizedSound(sound,1,{x:data.x,y:data.y});
    });
    setTimeout(function(){
        sprite.setVisible(true);
        sprite.anims.play(data.name);
        if(data.sound == 'bomb') Engine.camera.shake(300,0.01);
    },data.delay);
};

Engine.animateRangeAmmo = function(frame, from, to, depth, duration, delay, imagePool){ // All coordinates are pixels

    // TODO: refactor the whole pool thing and getNext only when you know that it's the right pool
    let arrow = Engine.arrowsPool.getNext();

    if(imagePool){
        arrow = imagePool.getNext();
    }

    arrow.setFrame(frame);
    arrow.setPosition(from.x+16,from.y+16);
    arrow.setDepth(depth);
    arrow.setVisible(false);

    var destx = (parseFloat(to.x))*32;
    var desty = (parseFloat(to.y))*32;
    console.log(destx,desty);

    var angle = Phaser.Math.Angle.Between(from.x,from.y,destx,desty)*(180/Math.PI);
    arrow.setAngle(angle + 45);

    Engine.scene.tweens.add(
        {
            targets: arrow,
            x: destx,
            y: desty,
            duration: duration,
            delay: delay,
            onComplete: function(){
                arrow.recycle();
            }
        }
    );
    Engine.playLocalizedSound('arrow',4,{x:from.x/32,y:from.y/32});
    setTimeout(function(){
        arrow.setVisible(true);
    },delay);
};

Engine.displayBomb = function(from,to,depth,duration,delay){ // All coordinates are pixels
    var bomb = Engine.bombsPool.getNext();
    bomb.setFrame('bomb');
    bomb.setPosition(from.x+16,from.y+16);
    bomb.setDepth(depth);
    bomb.setVisible(false);

    Engine.scene.tweens.add(
        {
            targets: bomb,
            x: (parseInt(to.x)+0.5)*32,
            y: (parseInt(to.y)+0.5)*32,
            angle: '+=360',
            duration: duration,
            delay: delay,
            onComplete: function(){
                bomb.recycle();
            }
        }
    );
    setTimeout(function(){
        bomb.setVisible(true);
    },delay);
};

Engine.displayHit = function(target,x,y,size,yDelta,dmg,miss,delay){
    var text = Engine.textPool.getNext();
    text.setStyle({ font: 'belwe', fontSize: size, fill: '#ffffff', stroke: '#000000', strokeThickness: 3 });
    text.setFont(size+'px belwe');
    text.setOrigin(0.5,1);
    text.setPosition(x,y);
    text.setDepth(target.depth+1);
    text.setText(miss ? 'Miss' : '-'+dmg);
    text.setVisible(false);

    // HP tween
    Engine.scene.tweens.add(
        {
            targets: text,
            y: target.y-yDelta,
            duration: 1000,
            delay: delay,
            onComplete: function(){
                text.recycle();
            }
        }
    );
    setTimeout(function(){
        if(miss) Engine.playLocalizedSound('arrow_miss',4,{x:x/32,y:y/32});
        text.setVisible(true);
    },delay);

    if(miss) return;
    // Blink tween
    if(target.blinkTween) target.blinkTween.stop();
    target.blinkTween = Engine.scene.tweens.add(
        {
            targets: target,
            alpha: 0,
            duration: 100,
            delay: delay,
            yoyo: true,
            repeat: 3,
            onStart: function(){
                target.setAlpha(1); // so that if it takes over another tween immediately, it starts from the proper alpha value
            },
            onComplete: function(){
                target.setAlpha(1);
            }
        });

};

Engine.getPlayerHealth = function(){
    return Engine.player.getStatValue('hp');
};

Engine.getPlayerMaxHealth = function(){
    return Engine.player.getStatValue('hpmax');
};

Engine.makeRespawnMenu = function(){
    var menu = new Menu();
    menu.fullHide = true;
    var respawnw = 300;
    var respawnh = 90;
    var respawnx = (Engine.getGameConfig().width-respawnw)/2;
    var respawny = 400;
    var respawn = menu.addPanel('respawn',new RespawnPanel(respawnx,respawny,respawnw,respawnh));
    respawn.addButton(respawnw-30, 8, 'blue','help',null,'',UI.textsData['respawn_help']);
    return menu;
};

Engine.makeBattleMenu = function(){
    var battle = new Menu();
    battle.fullHide = true;

    var equipment = battle.addPanel('equipment',new BattleEquipmentPanel());

    var belt = battle.addPanel('belt',new InventoryPanel(0,487,200,90,'Belt'));
    belt.setInventory('belt',5,true,BattleManager.processInventoryClick);

    battle.addEvent('onUpdateBelt',belt.updateInventory.bind(belt));
    battle.addEvent('onUpdateEquipment',equipment.updateEquipment.bind(equipment));
    battle.addEvent('onUpdateStats',equipment.updateStats.bind(equipment));

    battle.addEvent('onOpen',function(){
        belt.updateInventory();
        equipment.updateEquipment();
        equipment.updateStats();
        equipment.updateCapsules();
        Engine.hideCapsules();
    });

    battle.addEvent('onClose',function(){
        Engine.displayCapsules();
    });

    return battle;
};

Engine.makeProductionMenu = function(){
    var production = new Menu('Production');
    production.setTitlePos(100);
    production.setExitPos(680);
    var w = 400;
    var h = 350;
    var x = (Engine.getGameConfig().width-w)/2;
    var y = 150;

    var productionPanel = new ProductionPanel(x,y,w,h);
    productionPanel.addButton(w-30, 8, 'blue','help',null,'',UI.textsData['prod_help']);
    var gold = productionPanel.addCapsule('gold',20,20,'999','gold');
    gold.setHoverText(UI.tooltip,'Building gold',UI.textsData['shopgold_help']);
    production.addPanel('production',productionPanel);

    var action = new ShopPanel(212,440,300,100,'Take',true); // true = not shop, hack
    action.addButton(300-16,-8,'red','close',action.hide.bind(action),'Close');
    action.moveUp(2);
    production.addPanel('action',action,true);

    var prices = production.addPanel('prices',Engine.makePricesPanel(),true);
    prices.limitToProduction();

    var aw = 300;
    var goldaction = production.addPanel('goldaction',new ShopGoldPanel(212,390,aw,100,'Buy/Sell'),true);
    goldaction.addButton(aw-16,-8,'red','close',goldaction.hide.bind(goldaction),'Close');
    goldaction.moveUp(2);

    production.addEvent('onUpdateShop',function(){
        productionPanel.update();
        action.update();
    });

    production.addEvent('onUpdateShopGold',function(){
        productionPanel.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
    });

    production.addEvent('onOpen',function(){
        productionPanel.update();
        action.update();
        productionPanel.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
    });
    return production;
};

Engine.makeConstructionMenu = function(){
    var w = 500;
    var x = (Engine.getGameConfig().width-w)/2;
    var progressh = 300;
    var progressy = 150;

    var constr = new Menu('Construction');
    constr.setTitlePos(100);
    constr.setExitPos(720);

    var progress = new ConstructionPanel(x,progressy,w,progressh);
    progress.addButton(w-30, 8, 'blue','help',null,'',UI.textsData['progress_help']);
    constr.addPanel('progress',progress);
    var gold = progress.addCapsule('gold',20,-9,'999','gold');
    gold.setHoverText(UI.tooltip,'Building gold',UI.textsData['shopgold_help']);

    var aw = 300;
    var action = constr.addPanel('action',new ShopPanel(212,390,aw,100,'Give',true),true);
    action.addButton(aw-16,-8,'red','close',action.hide.bind(action),'Close');
    action.moveUp(2);

    var goldaction = constr.addPanel('goldaction',new ShopGoldPanel(212,390,aw,100,'Buy/Sell'),true);
    goldaction.addButton(aw-16,-8,'red','close',goldaction.hide.bind(goldaction),'Close');
    goldaction.moveUp(2);

    constr.addPanel('prices',Engine.makePricesPanel(),true);

    constr.addEvent('onUpdateShop',function(){
        progress.update();
        action.update();
    });

    constr.addEvent('onUpdateShopGold',function(){
        progress.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
    });

    constr.addEvent('onOpen',function(){
        progress.update();
        progress.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
        action.update();
    });

    return constr;
};

Engine.makeWipMenu = function(){
    var menu = new Menu();
    menu.setTitlePos(100);
    menu.setExitPos(730 );
    var w = 500;
    var x = (Engine.getGameConfig().width-w)/2;

    var panel = menu.addPanel('main',new InfoPanel(x,150,w,300));
    var txt = panel.addText(110,150,'Nothing to do here (yet)',null,24);

    return menu;
};

Engine.makeRestMenu = function(){
    var menu = new Menu();
    menu.setTitlePos(100);
    menu.setExitPos(670);
    var w = 400;
    var x = (Engine.getGameConfig().width-w)/2;

    var panel = menu.addPanel('main',new RestPanel(x,150,w,200));
    panel.addButton(w - 30, 8, 'blue','help',null,'',UI.textsData['shack_help']);
    menu.addEvent('onUpdateStats',panel.update.bind(panel));

    return menu;
};

Engine.makeMessagesMenu = function(){
    var title = UI.textsData['intro_title'];

    var menu = new Menu('Letters');
    menu.setSound(Engine.scene.sound.add('page_turn3'));
    var x = 150;
    var listw = 250;
    var gap = 20;
    var list = menu.addPanel('list',new MessagesPanel(x,100,listw,380,'Letters'));
    list.addMessages([{
        name: title
    }]);
    var msg = menu.addPanel('msg',new InfoPanel(x+listw+gap,100,500,380,'Selected letter'));
    msg.makeScrollable(); // TODO: only if text too long

    var x = 15;
    var y = 20;
    UI.textsData['intro_letter'].forEach(function(t){
        t = t.replace(/\[SETL\]/, Engine.settlementsData[Engine.player.settlement].name);
        t = t.replace(/\[OTSETL\]/, Engine.settlementsData[1-Engine.player.settlement+0].name); // quick fix
        var txt = msg.addText(x,y,t);
        y += txt.height+3;
    });

    /*menu.addEvent('onOpen',function(){
        Engine.UIelements[0].flagForStop = true;
    });*/

    return menu;
};

Engine.makeMapPanel = function(){
    var mapPanel = new MapPanel(10,100,1000,380,'',true); // true = invisible
    mapPanel.addBackground('bigbg');
    mapPanel.addLegend();
    mapPanel.addMap('bigbg_mask',900,380,-1,-1);
    mapPanel.addButtons();
    return mapPanel;
};

Engine.computeMissionGoal = function(mission){
    // TODO: conf/JSON
    var region = Engine.player.regionsStatus[Engine.player.region];
    switch(mission.goal){
        case 'resources':
            return Math.ceil(region.resources[1]/3); // A third of available nodes
        case 'exploration':
            return Math.ceil(region.exploration[1]/2); // half the AOIs
        case 'civhuts':
            return Math.ceil(region.civs[1]/2); // half the enemy blds
    }
};

Engine.computeMissionActual = function(mission){
    var region = Engine.player.regionsStatus[Engine.player.region];
    switch(mission.count.split(':')[0]){
        case 'allbuildings':
            return region.totalbuildings;
        case 'bldfood':
            return region.food[1];
        case 'building':
            return region.buildings[mission.count.split(':')[1]] || 0;
        case 'civhutkilled':
            return region.civCasualties[1];
        case 'civhuts':
            return region.civs[0];
        case 'civkilled':
            return region.civCasualties[0];
        case 'item':
            var counts = new Inventory().fromList(region.itemCounts);
            return (counts.getNb(mission.count.split(':')[1]));
        case 'playerfood':
            return region.food[0];
    }
};

Engine.makeRegionsMenu = function(mapPanel){
    var menu = new Menu('Regions');
    menu.log = true;
    menu.hidePinHover = true;

    menu.addPanel('map',mapPanel);
    var x = 10; // 500
    var w = 270;
    var status = menu.addPanel('status',new RegionStatusPanel(x,80,w,150,'region'));
    status.addButton(w-30, 0, 'blue','help',null,'',UI.textsData['regionstatus_help']);
    w = 620;
    x = (UI.getGameWidth()-w)/2;
    var missions = menu.addPanel('missions', new MissionsPanel(x,200,w,350,'Missions'),true);
    missions.addButton(w-16,-8,'red','close',missions.hide.bind(missions),'Close');
    missions.addButton(w-40, 8, 'blue','help',null,'',UI.textsData['missions_help']);
    status.moveUp(4);
    missions.moveUp(4);

    menu.beforeAll(function(){
        //var offset = (regionsData[Engine.player.region].x > 600 ? 120 : -120);
        //mapPanel.map.center.x = 510+offset;
        mapPanel.map.setControls(false);
    });

    menu.addEvent('onOpen',function(){
        status.update();
        mapPanel.map.centerOnRegion();
        mapPanel.legend.hide();
        mapPanel.hideButtons();
    });
    menu.addEvent('onUpdateMap',mapPanel.map.updatePins.bind(mapPanel.map));
    return menu;
};

Engine.makeMapMenu = function(mapPanel){
    var map = new Menu('World Map');
    map.log = true;
    map.hook = 'map';
    map.setSound(Engine.scene.sound.add('page_turn2'));
    map.addPanel('map',mapPanel);

    map.beforeAll(function(){
        mapPanel.map.center.x = 510;
        mapPanel.map.setControls(true);
    });
    map.addEvent('onUpdateMap',mapPanel.map.updatePins.bind(mapPanel.map));
    return map;
};

Engine.makePricesPanel = function(){
    var w = 415;
    var h = 480;
    var prices = new PricesPanel(Math.round((1024-w)/2),80,w,h,'Prices');
    prices.addButton(w-16,-8,'red','close',prices.hide.bind(prices),'Close');
    prices.addButton(w-40, 8, 'blue','help',null,'',UI.textsData['prices_help']);
    prices.moveUp(4);
    return prices;
};

Engine.addAdminButtons = function(panel,x,y){

    panel.pricesBtn = new BigButton(x,y,'Set prices',function(){
        Engine.currentMenu.displayPanel('prices');
        Engine.currentMenu.hidePanel('action');
        Engine.currentMenu.hidePanel('goldaction');
    });

    panel.ggBtn = new BigButton(x + 110,y,'Give gold',function(){
        Engine.currentMenu.hidePanel('action');
        var ga = Engine.currentMenu.displayPanel('goldaction');
        ga.setUp('sell');
    });

    panel.tgBtn = new BigButton(x + 220,y,'Take gold',function(){
        Engine.currentMenu.hidePanel('action');
        var ga = Engine.currentMenu.displayPanel('goldaction');
        ga.setUp('buy');
    });
};

Engine.makeTradeMenu = function(){
    var trade = new Menu('Trade');
    trade.setTitlePos(10);
    trade.setExitPos(885);
    var y = 80;
    var w = 400;
    var h = 480;
    var space = 15;
    var center = Engine.getGameConfig().width/2;
    var client = trade.addPanel('client',new ShopInventoryPanel(center-w-space,y,w,h,'You'));
    client.setInventory('player');
    var gold = client.addCapsule('gold',120,-9,'999','gold');
    gold.setHoverText(UI.tooltip,'Your gold',UI.textsData['gold_help']);
    client.addButton(w-30, 8, 'blue','help',null,'',UI.textsData['sell_help']);
    var shop =  trade.addPanel('shop',new ShopInventoryPanel(center+space,y,w,h,'Shop'));
    shop.setInventory('building');
    var shopgold = shop.addCapsule('gold',100,-9,'999','gold');
    shopgold.setHoverText(UI.tooltip,'Shop gold',UI.textsData['shopgold_help']);
    shop.addButton(w-30, 8, 'blue','help',null,'',UI.textsData['buy_help']);
    w = 300;
    var x = (Engine.getGameConfig().width-w)/2;
    var action = trade.addPanel('action',new ShopPanel(x,440,w,100,'Buy/Sell'),true);
    action.addButton(w-16,-8,'red','close',action.hide.bind(action),'Close');
    action.moveUp(2);
    var goldaction = trade.addPanel('goldaction',new ShopGoldPanel(x,420,w,100,'Buy/Sell'),true);
    goldaction.addButton(w-16,-8,'red','close',goldaction.hide.bind(goldaction),'Close');
    goldaction.moveUp(2);

    var prices = trade.addPanel('prices',Engine.makePricesPanel(),true);

    trade.addEvent('onUpdateInventory',function(){
        client.updateContent();
        action.update();
    });
    trade.addEvent('onUpdateShop',function(){
        shop.updateContent();
        action.update();
    });
    trade.addEvent('onUpdateGold',function(){
        client.updateCapsule('gold',Engine.player.gold);
        Engine.scene.sound.add('sellbuy').play();
        shop.updateContent();
        action.update();
        goldaction.update();
    });
    trade.addEvent('onUpdateShopGold',function(){
        shop.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
        client.updateContent();
        action.update();
        goldaction.update();
    });
    trade.addEvent('onOpen',function(){
        client.updateCapsule('gold',Engine.player.gold);
        shop.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
        client.updateContent();
        shop.updateContent();
        action.update();
        goldaction.update();
    });
    return trade;
};

Engine.makeCraftingMenu = function(){
    var crafting = new Menu('Crafting');
    crafting.setTitlePos(10);
    crafting.setSound(Engine.scene.sound.add('crafting'));
    crafting.setExitPos(885);

    var combix = 20;
    var combiw = 550;
    var y = 80;
    var recipesw = 400;
    var h = 480;
    var space = 15;

    var recipes = crafting.addPanel('shop',new RecipesPanel(combix+combiw+space,y,recipesw,h,'Recipes'));
    recipes.setInventory('crafting');
    var gold = recipes.addCapsule('gold',120,-9,'999','gold');
    gold.setHoverText(UI.tooltip,'Workshop gold',UI.textsData['shopgold_help']);
    recipes.addButton(recipesw-30, 8, 'blue','help',null,'',UI.textsData['recipes_help']);

    var combi = crafting.addPanel('combi',new CraftingPanel(combix,y,combiw,h,'Crafting'));
    combi.addButton(combiw-30, 8, 'blue','help',null,'',UI.textsData['combi_help']);

    var prices = crafting.addPanel('prices',Engine.makePricesPanel(),true);
    prices.limitToCrafting();

    var x = (Engine.getGameConfig().width-300)/2;
    var goldaction = crafting.addPanel('goldaction',new ShopGoldPanel(x,420,300,100,'Buy/Sell'),true);
    goldaction.addButton(300-16,-8,'red','close',goldaction.hide.bind(goldaction),'Close');
    goldaction.moveUp(2);

    crafting.addEvent('onUpdateShopGold',function(){
        recipes.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
        goldaction.update();
    });

    crafting.addEvent('onUpdateShop',function(){
        recipes.updateContent();
        combi.updateIngredients();
    });
    
    crafting.addEvent('onUpdateRecipes',function(){
        recipes.updateContent();
    });

    crafting.addEvent('onUpdateInventory',function(){
        recipes.updateContent();
        combi.updateIngredients();
    });

    crafting.addEvent('onOpen',function(){
        recipes.updateContent();
        recipes.updateCapsule('gold',(Engine.currentBuiling.gold || 0));
    });

    return crafting;
};

Engine.makeBuildMenu = function(){
    var build = new Menu();
    build.keepHUD = true;
    build.allowWalk = true;
    build.name = 'Build something'; // Allows to have a hover name without a menu title
    build.hook = 'build';
    var w = 300;
    var buildings = build.addPanel('build',new BuildPanel(30,50,w,450,'Build'));
    buildings.addButton(w-16,-8,'red','close',build.hide.bind(build),'Close');
    buildings.addButton(w-33, 8, 'blue','help',null,'',UI.textsData['build_help']);
    buildings.moveUp(2);
    build.addEvent('onOpen',buildings.updateContent.bind(buildings));
    build.addEvent('onUpdateBuildRecipes',buildings.updateContent.bind(buildings));
    return build;
};

Engine.bldClick = function(){
    var bld = buildingsData[this.bldID];
    Engine.currentMenu.hide();

    Engine.hideMarker();
    Engine.bldRect = Engine.scene.add.rectangle(0,0, bld.base.width*32, bld.base.height*32, 0x00ee00).setAlpha(0.7);
    Engine.bldRect.bldID = this.bldID;
    Engine.bldRect.locationConstrained = bld.locationConstrained;
    Engine.updateBldRect();

    if(Client.tutorial) TutorialManager.triggerHook('bldselect:'+this.bldID);
};

Engine.bldUnclick = function(shutdown){
    if(!Engine.bldRect.collides && !shutdown) {
        var id = Engine.bldRect.bldID;
        var pos = Engine.bldRect.getBottomLeft();
        pos.x = pos.x / 32;
        pos.y = (pos.y / 32) - 1;
        Client.sendBuild(id, pos);
    }
    Engine.showMarker();
    Engine.bldRect.destroy();
    Engine.bldRect = null;
};

Engine.updateBldRect = function(){
    // Center coordinates ; !! marker has origin 0,0
    Engine.bldRect.x = (Engine.bldRect.width%64 == 0 ? Engine.marker.x+32 : Engine.marker.x+16);
    Engine.bldRect.y = (Engine.bldRect.height%64 == 0 ? Engine.marker.y+32 : Engine.marker.y+16);
    var collides = false;
    var invalid = false;
    for(var x = 0; x < Engine.bldRect.width/32; x++){
        if(collides || invalid) break;
        for(var y = 0; y < Engine.bldRect.height/32; y++){
            var cx = (Engine.bldRect.x-(Engine.bldRect.width/2))/32+x;
            var cy = (Engine.bldRect.y-(Engine.bldRect.height/2))/32+y;
            if(Engine.checkCollision(cx,cy)){
                collides = true;
                break;
            }
            if(Engine.bldRect.locationConstrained && !Engine.checkResource(cx,cy)){
                invalid = true;
                break;
            }
        }
    }
    Engine.bldRect.collides = (collides || invalid);
    if(collides || invalid){
        Engine.bldRect.setFillStyle(0xee0000);
    }else{
        Engine.bldRect.setFillStyle(0x00ee00);
    }
};

Engine.makeInventory = function(statsPanel){
    // ## Inventories are only displayed if a trigger calls onUpdateInventory; TODO change that!!
    var inventory = new Menu('Inventory');
    inventory.log = true;
    inventory.setSound(Engine.scene.sound.add('inventory'));

    var items = inventory.addPanel('items',new InventoryPanel(40,100,600,260,'Backpack'));
    items.setInventory('player',15,true,UI.backpackClick);

    var gold = items.addCapsule('gold',130,-9,'999','gold');
    gold.setHoverText(UI.tooltip,'Gold',UI.textsData['gold_help']);
    items.addButton(570, 8, 'blue','help',null,'',UI.textsData['inventory_help']);

    inventory.addPanel('itemAction',new ItemActionPanel(70,220,300,120),true);

    var belt = inventory.addPanel('belt',new InventoryPanel(40,360,600,90,'Belt'));
    belt.setInventory('belt',15,true,UI.beltClick);
    belt.addButton(570, 8, 'blue','help',null,'',UI.textsData['belt_help']);

    var equipment = new EquipmentPanel(665,100,330,235,'Equipment');
    equipment.addButton(300, 8, 'blue','help',null,'',UI.textsData['equipment_help']);
    inventory.addPanel('equipment',equipment);

    inventory.addPanel('stats',statsPanel);

    inventory.addEvent('onUpdateEquipment',equipment.updateEquipment.bind(equipment));
    inventory.addEvent('onUpdateInventory',items.updateInventory.bind(items));
    inventory.addEvent('onUpdateBelt',belt.updateInventory.bind(belt));
    inventory.addEvent('onUpdateStats',function(){
        statsPanel.updateStats(Engine.player);
    });
    inventory.addEvent('onUpdateGold',function(){
        items.updateCapsule('gold',Engine.player.gold);
    });
    inventory.addEvent('onOpen',function(){
        equipment.updateEquipment();
        items.updateInventory();
        belt.updateInventory();
        statsPanel.updateStats(Engine.player);
        items.updateCapsule('gold',Engine.player.gold);
    });
    return inventory;
};

Engine.makeAbilitiesMenu = function(){
    var menu = new Menu('Abilities');
    menu.addPanel('abilities',new AbilitiesPanel(40,100,600,380,'Abilities'));
    menu.addPanel('desc',new AbilityPanel(660,100,340,380,'Description'));
    return menu;
};

Engine.makeCharacterMenu = function(){
    var menu = new Menu('Character');
    menu.log = true;
    menu.setSound(Engine.scene.sound.add('page_turn'));

    var citizenx = 40;
    var citizeny = 100;
    var citizenw = 470;
    var citizenh = 200;
    var gap = 10;
    var classx = citizenx+citizenw+gap;
    var classy = 100;
    var classw = 470;
    var classh = 300;
    var questy = classy+classh;
    var logy = citizeny+citizenh;
    var questh = 380-classh;
    var logh = 380 - citizenh;

    //var citizen = menu.addPanel('citizen', new CitizenPanel(citizenx,citizeny,citizenw,citizenh,'Civic status'));
    var log = menu.addPanel('log', new JournalPanel(citizenx,citizeny,citizenw,logh+citizenh,'Journal'));

    var classpanel = menu.addPanel('class', new CharacterPanel(classx,classy,classw,classh,'Multi-Class status'));
    var sx = classx + 15;
    var cx = sx;
    var cy = classy + 30;
    var cw = Math.round((classw - 45)/2);
    var ch = (classh - 100)/2;
    for(var classID in UI.classesData) {
        var p = menu.addPanel('class_'+classID, new ClassMiniPanel(cx,cy,cw,ch,UI.classesData[classID].name,classID));
        cx += cw + 15;
        if(classID == 1){
            cx = sx;
            cy += ch;
        }

        //var ab = menu.addPanel('abilities_'+classID, new Panel(citizenx,citizeny,citizenw,citizenh,'Abilities'), true);
        //ab.addButton(citizenw,-8,'red','close',ab.hide.bind(ab),'Close');
    }

    var quests = menu.addPanel('quests', new Panel(classx,questy,classw,questh,'Daily quests'));

    //menu.addPanel('abilities',new Panel(citizenx,citizeny,citizenw,citizenh),true);

    menu.addEvent('onUpdateCharacter',classpanel.update.bind(classpanel));
    menu.addEvent('onUpdateHistory',log.update.bind(log));
    menu.addEvent('onOpen',log.update.bind(log));
    //menu.addEvent('onUpdateCitizen',citizen.update.bind(citizen));
    //menu.addEvent('onUpdateCommit',commit.updateInventory.bind(commit));

    return menu;
};

Engine.getIngredientsPanel = function(){
    return Engine.menus['crafting'].panels['ingredients'];
};

Engine.addHero = function(data){
    // data comes from the initTrim()'ed packet of the player
    Engine.player = new Hero();
    Engine.player.setUp(data);
    Engine.camera.startFollow(Engine.player); // leave outside of constructor
    //Engine.camera.setDeadzone(7*32,5*32);
    Engine.camera.setLerp(0.1);
    /*var graphics = Engine.scene.add.graphics().setScrollFactor(0);
    // graphics.lineStyle(2, 0x00ff00, 1);
    var w = Engine.camera.deadzone.width;
    var h = Engine.camera.deadzone.height;
    graphics.strokeRect(Engine.camera.centerX-(w/2), Engine.camera.centerY-(h/2), w, h);
    graphics.setDepth(2000);*/
};

Engine.updateEnvironment = function(){
    if(!Engine.playerIsInitialized) return;
    var chunks = Utils.listAdjacentAOIs(Engine.player.chunk);
    var newChunks = chunks.diff(Engine.displayedChunks);
    var oldChunks = Engine.displayedChunks.diff(chunks);

    if(!Client.tutorial) {
        for (var i = 0; i < oldChunks.length; i++) {
            Engine.removeChunk(oldChunks[i]);
        }
    }

    for(var j = 0; j < newChunks.length; j++){
        Engine.displayChunk(newChunks[j]);
    }
};

Engine.displayChunk = function(id){
    if(Engine.mapDataCache[id]){
        // Chunks are deleted and redrawn rather than having their visibility toggled on/off, to avoid accumulating in memory
        Engine.drawChunk(Engine.mapDataCache[id],id);
    }else {
        Engine.loadJSON(Engine.mapDataLocation+'/chunk' + id + '.json', Engine.drawChunk, id);
    }
};

Engine.loadJSON = function(path,callback,data){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText),data);
        }
    };
    xobj.send(null);
};

Engine.drawChunk = function(mapData,id){
    var chunk = new Chunk(mapData, Engine.tilesetData, Engine.scene);
    Engine.chunks[chunk.id] = chunk;
    if (!Engine.mapDataCache[chunk.id]) Engine.mapDataCache[chunk.id] = mapData;
    Engine.displayedChunks.push(chunk.id);
    Engine.updateBehindness();
};

Engine.removeChunk = function(id){
    if(Engine.useBlitters) return; // todo: hack
    Engine.chunks[id].erase();
    Engine.displayedChunks.splice(Engine.displayedChunks.indexOf(id),1);
};

// Check if a non-walkable tile is at a given position or not
Engine.checkCollision = function(x,y){ // returns true if tile is not walkable
    return Engine.collisions.has(x,y);
};

Engine.checkResource = function(x,y){
    return Engine.resources.has(x,y);
};

Engine.handleKeyboard = function(event){
    //console.log(event);
    if(Engine.currentTutorialPanel && Engine.currentTutorialPanel.handleKeyboard){
        Engine.currentTutorialPanel.handleKeyboard(event);
        return;
    }
    if(event.key == 'Enter') Engine.toggleChatBar();
};

Engine.handleDown = function(pointer,objects){
    UI.downCursor();
    if(objects.length > 0 && objects[0].handleDown)objects[0].handleDown(pointer);
};

Engine.handleClick = function(pointer,objects){
    UI.upCursor();
    if(objects.length > 0){
        for(var i = 0; i < Math.min(objects.length,2); i++){ // disallow bubbling too deep, only useful in menus (i.e. shallow)
            if(objects[i].handleClick) objects[i].handleClick(pointer);
        }
    }else{
        if(!BattleManager.inBattle && !Engine.dead) {
            if(Engine.bldRect){
                Engine.bldUnclick();
            }else {
                if(Engine.inMenu && !Engine.currentMenu.allowWalk) return;
                Engine.moveToClick(pointer);
            }
        }
    }
};

Engine.handleOver = function(pointer,objects){
    if(pointer.x == 0 && pointer.y == 0) return; // quick fix
    if(objects.length > 0){
        for(var i = 0; i < Math.min(objects.length,2); i++) { // disallow bubbling too deep, only useful in menus (i.e. shallow)
            var obj = objects[i];
            if(obj.constructor.name == 'Building') Engine.hideMarker();
            if(obj.handleOver) obj.handleOver();
        }
    }
};

Engine.handleOut = function(pointer,objects){
    if(objects.length > 0) {
        for(var i = 0; i < Math.min(objects.length,2); i++) { // disallow bubbling too deep, only useful in menus (i.e. shallow)
            var obj = objects[i];
            if(obj.constructor.name == 'Building' && (!Engine.inMenu || Engine.currentMenu.allowWalk)) Engine.showMarker();
            if(obj.handleOut) obj.handleOut();
        }
    }
};

Engine.handleDrag = function(pointer,object,dragX,dragY){
    if(object && object.handleDrag) object.handleDrag(dragX,dragY);
};

Engine.moveToClick = function(pointer){
    Engine.player.setDestinationAction(0);
    Engine.computePath(Engine.getMouseCoordinates(pointer).tile,false);
};

Engine.computePath = function(position,nextTo){
    // console.log('going to ',position);
    var x = position.x;
    var y = position.y;
    if(x === undefined || y === undefined) console.warn('Pathfiding to undefined coordinates');
    // if(!nextTo && Engine.checkCollision(x,y)) return;
    var start = Engine.player.getPFstart();
    if(Engine.player.moving) Engine.player.stop();

    var path = Engine.pathFinder.findPath(start,{x:x,y:y},false,nextTo); // seek = false, nextTo = true
    if(!path) {
        if(!Engine.checkCollision(x,y)) Engine.player.talk('It\'s too far!');
        // Engine.player.talk('I can\'t go there!');
        return;
    }

    var trim = PFUtils.trimPath(path,Engine.battleCellsMap);
    if(trim.trimmed) Engine.player.setDestinationAction(0);
    path = trim.path;

    if(Engine.player.destinationAction && Engine.player.destinationAction.type != 1) path.pop();
    Client.sendPath(path,Engine.player.destinationAction);
    Engine.player.queuePath(path);
};

Engine.updatePosition = function(player){
    if(player.x > player.previousPosition.x){ // right
        player.orientation = 'right';
    }else if(player.x < player.previousPosition.x) { // left
        player.orientation = 'left';
    }else if(player.y > player.previousPosition.y) { // down
        player.orientation = 'down';
    }else if(player.y < player.previousPosition.y) { // up
        player.orientation = 'up';
    }

    player.previousPosition = {
        x: player.x,
        y: player.y
    };
    player.tileX = Math.floor(player.x/Engine.tileWidth);
    player.tileY = Math.floor(player.y/Engine.tileHeight);
    if(player.id == Engine.player.id) {
        player.chunk = Utils.tileToAOI({x: player.tileX, y: player.tileY});
        if (player.chunk != player.previousChunk) Engine.updateEnvironment();
        player.previousChunk = player.chunk;
    }
};

Engine.getMouseCoordinates = function(pointer){
    // +16 so that the target tile is below the middle of the cursor
    var pxX = Engine.camera.scrollX + pointer.x;// + 16;
    var pxY = Engine.camera.scrollY + pointer.y;// + 16;
    if(!Engine.debugMarker && !BattleManager.inBattle){
        pxX += 16;
        pxY += 16;
    }
    var tileX = Math.floor(pxX/Engine.tileWidth);
    var tileY = Math.floor(pxY/Engine.tileHeight);
    Engine.lastPointer = {x:pointer.x,y:pointer.y};
    return {
        tile:{x:tileX,y:tileY},
        pixel:{x:pxX,y:pxY}
    };
};

Engine.isInView = function(x,y){
    if(x < Engine.player.tileX - Engine.viewWidth/2) return false;
    if(x >= Engine.player.tileX + Engine.viewWidth/2) return false;
    if(y < Engine.player.tileY - Engine.viewHeight/2) return false;
    if(y >= Engine.player.tileY + Engine.viewHeight/2) return false;
    return true;
};

Engine.trackMouse = function(event){
    var position = Engine.getMouseCoordinates(event);
    if(Engine.player) Engine.updateMarker(position.tile);
    if(Engine.debug){
        document.getElementById('pxx').innerHTML = Math.round(event.x);
        document.getElementById('pxy').innerHTML = Math.round(event.y);
        document.getElementById('tx').innerHTML = position.tile.x;
        document.getElementById('ty').innerHTML = position.tile.y;
        document.getElementById('aoi').innerHTML = Utils.tileToAOI(position.tile);
    }
};

Engine.updateMarker = function(tile){
    Engine.marker.x = (tile.x*Engine.tileWidth);
    Engine.marker.y = (tile.y*Engine.tileHeight);
    if(Engine.bldRect) Engine.updateBldRect();
    if(tile.x != Engine.marker.previousTile.x || tile.y != Engine.marker.previousTile.y){
        Engine.marker.previousTile = tile;
        if(Engine.checkCollision(tile.x,tile.y)){
            if(Engine.debugMarker) Engine.marker.setFrame(1);
        }else{
            if(Engine.debugMarker) Engine.marker.setFrame(0);
        }
    }
};

Engine.hideMarker = function(){
    if(Engine.marker) Engine.marker.setVisible(false);
};

Engine.showMarker = function(){
    if(Engine.debugMarker && Engine.marker) Engine.marker.setVisible(true);
};

/*
* #### UPDATE CODE #####
* */

Engine.updateSelf = function(data){
    Engine.player.updateData(data);
};

Engine.update = function(){

};
//TODO: compute once
Engine.getAnimalData = function(type){
    var animalData = animalsData[type];
    if(!animalData){
        console.warn('ERROR: no animal data for animal',type);
        return {};
    }
    if(animalData.inheritFrom !== undefined) animalData = Object.assign(animalsData[animalData.inheritFrom],animalData);
    return animalData;
};

// Processes the global update packages received from the server
Engine.updateWorld = function(data){  // data is the update package from the server
    //console.log(data);
    // TODO: store client/server-shared list somewhere
    var entities = ['animal','building','cell','civ','item','player','remain'];

    entities.forEach(function(e){
        var news = data['new'+e+'s'];
        var edits = data[e+'s'];
        var dels = data['removed'+e+'s'];
        if(news) Engine.createElements(news,e);
        if(edits) Engine.updateElements(edits,Engine[e+'s']);
        if(dels) Engine.removeElements(dels,(e == 'cell' ? Engine.battleCells : Engine[e+'s'])); // quick fix
    });
};

Engine.createElements = function(arr,entityType){ // entityType = 'animal', 'building', ...
    var pool = Engine.entityManager.pools[entityType];
    var constructor = Engine.entityManager.constructors[entityType];
    arr.forEach(function(data){
        var e = pool.length > 0 ? pool.shift() : new constructor();
        e.setUp(data);
        e.update(data);
        if(Client.tutorial) TutorialManager.triggerHook('new'+entityType+':'+data.type);
    });
};

// For each element in obj, call update()
// format: list of {id,data}
Engine.updateElements = function(obj,table){
    Object.keys(obj).forEach(function (key) {
        if(!table.hasOwnProperty(key)) {
            // if(Engine.debug) console.warn('Attempt to update non-existing element with ID',key);
            return;
        }
        table[key].update(obj[key]);
    });
};

Engine.removeElements = function(arr,table){
    arr.forEach(function(id){
        if(!table.hasOwnProperty(id)) {
            // if(Engine.debug) console.warn('Attempt to remove non-existing element with ID',id);
            return;
        }
        table[id].remove();
    });
};

Engine.updateMenus = function(category){
    var callbackMap = {
        'belt': 'onUpdateBelt',
        'bldrecipes': 'onUpdateBuildRecipes',
        'character': 'onUpdateCharacter',
        'citizen': 'onUpdateCitizen',
        'commit': 'onUpdateCommit',
        'equip': 'onUpdateEquipment',
        'gold': 'onUpdateGold',
        'history': 'onUpdateHistory',
        'inv': 'onUpdateInventory',
        'map': 'onUpdateMap',
        'productivity':'onUpdateProductivity',
        'stats': 'onUpdateStats'
    };

    var event = callbackMap[category];
    if(Engine.currentMenu) Engine.currentMenu.trigger(event);

    var capsulesMap = {
        // 'food': Engine.foodCapsule,
        'gold': Engine.goldCapsule,
        'inv': Engine.bagCapsule,
        'stats': Engine.capsules,
        // 'vigor': Engine.vigorCapsule
    };
    if(category in capsulesMap){
        if(capsulesMap[category]) capsulesMap[category].update();
    }
};

Engine.inThatBuilding = function(id){
    return (Engine.currentBuiling && Engine.currentBuiling.id == id);
};

Engine.checkForBuildingMenuUpdate= function(id,event){
    if(Engine.inThatBuilding(id)) {
        Engine.currentMenu.trigger(event);
    }
    if(Engine.repairPanel.displayed) Engine.repairPanel.update();
};

Engine.addPlayer = function(data){
    var sprite = new Player();
    sprite.setUp(data);
    return sprite;
};

Engine.getTilesetFromTile = function(tile){
    if(Engine.tilesetMap.hasOwnProperty(tile)) return Engine.tile;
    setMap[tile];
    for(var i = 0; i < Engine.tilesets.length; i++){
        if(tile < Engine.tilesets[i].firstgid){
            Engine.tilesetMap[tile] = i-1;
            return i-1;
        }
    }
    return Engine.tilesets.length-1;
};

Engine.enterBuilding = function(id){
    if(id == -1) return;
    Engine.player.setVisible(false);
    var building = Engine.buildings[id];
    Engine.inBuilding = true;
    Engine.currentBuiling = building; // used to keep track of which building is displayed in menus
    var buildingData = buildingsData[building.buildingType];

    var mainMenu;
    if(building.built == true) {
        mainMenu = Engine.menus[buildingData.mainMenu];
    }else{
        mainMenu = Engine.menus.construction;
    }

    mainMenu.display();
    building.handleOut();

    Engine.buildingTitle.setText(buildingData.name);
    var owner = Engine.currentBuiling.isOwned() ? 'Your' : (Engine.currentBuiling.ownerName || 'Player')+'\'s';
    Engine.buildingTitle.capsule.setText(owner);
    Engine.buildingTitle.move(Engine.currentMenu.titleY);
    Engine.buildingTitle.display();

    if(Client.tutorial) TutorialManager.checkHook();
};

Engine.exitBuilding = function(){
    Engine.player.setVisible(true);
    Engine.camera.startFollow(Engine.player);
    Engine.inBuilding = false;
    Engine.currentBuiling = null;
    Engine.currentMenu.hide();
    Engine.buildingTitle.hide();
    for(var m in Engine.menus){
        if(!Engine.menus.hasOwnProperty(m)) continue;
        Engine.menus[m].hideIcon();
    }
    if(Engine.miniMap)  Engine.miniMap.follow();
    if(Client.tutorial) TutorialManager.triggerHook('exit');
};

Engine.getHolderSize = function(){
    return (Engine.countIcons()-1)*50 + 15;
};

Engine.countIcons = function(){
    var count = 0;
    Engine.UIelements.forEach(function(e){
        if(e.visible) count++;
    });
    return count;
};

Engine.processNPCClick = function(target){
    if(UI.inPanel) return;
    if(target.dead){
        var action = target.entityType == 'animal' ? 2 : 4;
        Engine.player.setDestinationAction(action,target.id,target.tileX,target.tileY); // 2 for NPC
        Engine.computePath({x:target.tileX,y:target.tileY});
    }else{
        Client.NPCClick(target.id,(target.entityType == 'animal' ? 0 : 1));
    }
};

Engine.processItemClick = function(target){
    if(UI.inPanel) return;
    Engine.player.setDestinationAction(3,target.id,target.tileX,target.tileY); // 3 for item
    Engine.computePath({x:target.tileX,y:target.tileY},true);
};

Engine.requestBattleAttack = function(target){
    if(BattleManager.actionTaken) return;
    Engine.requestBattleAction('attack',{id:target.getShortID()});
};

Engine.requestBomb = function(x,y){
    if(BattleManager.actionTaken) return;
    Engine.requestBattleAction('bomb',{x:x,y:y});
};

// General battle action method called by the more specific ones (except moving)
Engine.requestBattleAction = function(action,data){
    BattleManager.actionTaken = true;
    Client.battleAction(action,data);
};

/*Engine.getGridFrame = function(x,y){
    var grid = Engine.battleZones;
    var hasleft = grid.has(x-1,y);
    var hasright = grid.has(parseInt(x)+1,y);
    var hastop = grid.has(x,y-1);
    var hasbottom = grid.has(x,parseInt(y)+1);
    var row, col;

    if(hastop && !hasbottom){
        row = 2;
    }else if(!hastop && hasbottom){
        row = 0;
    }else{
        row = 1;
    }

    if(hasleft && !hasright){
        col = 2
    }else if(!hasleft && hasright){
        col = 0;
    }else{
        col = 1;
    }

    //console.log(x,y,col,row,hasleft,hasright,hastop,hasbottom);
    return Utils.gridToLine(col,row,3);
};*/

Engine.isBattleCell = function(x,y){
    return Engine.battleCells.get(x,y);
};

Engine.getNextPrint = function(){
    if(Engine.printsPool.length > 0) return Engine.printsPool.shift();
    return Engine.scene.add.image(0,0,'footsteps');
};

Engine.recycleSprite = function(sprite){
    Engine.spritePool.recycle(sprite);
};

Engine.recycleImage = function(image){
    Engine.imagePool.recycle(image);
};

Engine.recyclePrint = function(print){
    Engine.printsPool.push(print);
};

Engine.updateGrid = function(){
    Engine.entityManager.displayLists['cell'].forEach(function(id){
        Engine.battleCells[id].update();
    });
};

Engine.getOccupiedCells = function(entity,hash){
    if(entity.entityType == 'building') return [];
    var cells = [];
    for(var i = 0; i < entity.cellsWidth; i++){
        for(var j = 0; j < entity.cellsHeight; j++){
            if(hash){
                cells.push((entity.tileX+i)+'_'+(entity.tileY+j));
            }else{
                cells.push({x:entity.tileX,y:entity.tileY});
            }
        }
    }
    return cells;
};

// ## UI-related functions ##

Engine.unequipClick = function(){ // Sent when unequipping something
    Client.sendUnequip(this.slotName);
};

Engine.sellClick = function(){
    Engine.currentMenu.panels['action'].setUp(this.itemID,'sell');
    /*if(Engine.currentBuiling.isOwned()){
        Engine.currentMenu.panels['prices'].display();
    }*/
};

Engine.buyClick = function(){
    Engine.currentMenu.panels['action'].setUp(this.itemID,'buy');
    /*if(Engine.currentBuiling.isOwned()){
        Engine.currentMenu.panels['prices'].display();
    }*/
};

Engine.giveClick = function(itemID){
    Engine.currentMenu.panels['action'].display();
    Engine.currentMenu.panels['action'].setUp(itemID,'sell');
};

Engine.takeClick = function(){
    //if(Engine.currentBuiling.owner != Engine.player.id) return;
    if(!Engine.currentBuiling.isOwned()) return;
    Engine.currentMenu.panels['action'].display();
    Engine.currentMenu.panels['action'].setUp(this.itemID,'buy');
};

Engine.respawnClick = function(){ // this bound to respawn panel
    Client.sendRespawn();
    Engine.menus["respawn"].hide();
};

Engine.buildError = function(){
    Engine.currentMenu.panels['confirm'].displayError();
};

Engine.buildSuccess = function(){
    Engine.currentMenu.panels['buildings'].hide();
    Engine.currentMenu.panels['confirm'].hide();
    Engine.currentMenu.panels['ingredients'].hide();
    Engine.currentMenu.panels['map'].map.hideRedPin();
};

Engine.leaveBuilding = function(){
    Client.sendExit();
    Engine.exitBuilding();
};

Engine.snap = function(){
    Engine.getGameInstance().renderer.snapshot(function(img){
        Client.sendScreenshot(img.src,Boot.detectBrowser());
    });
};

Engine.debugQT = function(quads){
    Engine.qtQuads.forEach(function(q){
       q.destroy();
    });
    quads.forEach(function(q){
        var rect = Engine.scene.add.rectangle(q.x*32, q.y*32, (q.w)*32, (q.h)*32, 0x6666ff);
        rect.setDepth(100).setOrigin(0);
        Engine.qtQuads.push(rect);
    });
};

Chunk.prototype.postDrawTile = function(){}; // Used in editor
Chunk.prototype.postDrawImage = function(x,y,image,sprite){
    var hover = this.getAtlasData(image,'hover');
    if(!hover) return;
    sprite.id = 0;
    sprite.tx = Math.floor(x);
    sprite.ty = Math.floor(y);
    sprite.setInteractive();
    sprite.on('pointerover',function(){
        UI.hoverFlower++;
        sprite.formerFrame = sprite.frame.name;
        sprite.setFrame(hover);
        Engine.hideMarker();
        UI.setCursor('item'); // TODO: use UI.manageCursor() instead?
    });
    sprite.on('pointerout',function(){
        UI.hoverFlower--;
        sprite.setFrame(sprite.formerFrame);
        if(UI.hoverFlower <= 0) {
            Engine.showMarker();
            UI.setCursor();
        }
    });
    sprite.on('pointerdown',function(){
        if(!BattleManager.inBattle) Engine.processItemClick(sprite,true);
    });
};


Chunk.prototype.addOverlay = function(cx,cy){
    Engine.overlay.add(cx-1, cy-2, 1);
    Engine.overlay.add(cx, cy-2, 1);
    Engine.overlay.add(cx+1, cy-2, 1);
    Engine.overlay.add(cx+2, cy-2, 1);
    Engine.overlay.add(cx, cy-3, 1);
    Engine.overlay.add(cx+1, cy-3, 1);
};

Chunk.prototype.addCollision = function(cx,cy){
    Engine.collisions.add(cx, cy, 1);
};

Chunk.prototype.removeCollision = function(cx,cy){
    Engine.collisions.delete(cx,cy);
};

Chunk.prototype.addResource = function(x,y){
    Engine.resources.add(x,y);
};

export default Engine;
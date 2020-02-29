/*
load the data: tre sa verific daca chiar e cifra respectiva acolo, cu, e formatu

la final sa afisez [rpcentele pt fiecare cifra in parte cand e ghicita]
*/

let mnist;
let train_ind = 0;
let epch = 1000; // nr imagini pt train
let nn;
let user_digit;


function train_epoch(idx)
{
    for(let i = 0; i < epch; i++)
    {
        let inp = [];
        for(let j = 0; j < 784; j++)
        {
            inp[j] = mnist.train_images[j + idx * 784] / 255;
        }
        let rez = new Array(10).fill(0);
        rez[mnist.test_labels[idx]] = 1;
        nn.train(inp, rez);
        idx++;
    }
}

function test()
{
    let nr = 0;
    for(let i = 0 ; i < 100; i++)
    {
        let inp = [];
        for(let j = 0; j < 784; j++)
        {
            inp[j] = mnist.test_images[i] / 255;
        }
        let guess = nn.predict(inp);
        let ma = 0;
        let poz;
        for(let j = 0; j < 10; j++)
            if(guess[j] > ma)
            {
                ma = guess[j];
                poz = j;
            }
        if(mnist.test_labels[i] === poz)
            nr++;
    }
    return nr;
}



function setup()
{
    createCanvas(400, 200).parent('container');
    nn = new NeuralNetwork(784, 128, 10);
    user_digit = createGraphics(200, 200);
    console.log("WWWWWWWW");
    //user_digit.pixelDensity(1);
    
     loadMNIST(function (data)
    {
        mnist = data;
        console.log(mnist);
        /*
        nn = new NeuralNetwork(784, 64, 10);
        train_epoch(0);
        train_epoch(epch * 1);
        train_epoch(epch * 2);
        console.log(test());
        train_epoch(epch * 3);
        train_epoch(epch * 4);
        console.log(test());
        train_epoch(epch * 5);
        train_epoch(epch * 6);
        console.log(test());
        */
    });
 
   
    
    
    
}



function draw()
{
    guessUserDigit();
    background(0);    
    if(mnist)
    {    
        for(let i = 0; i < 10; i++)
            train();
      
        //console.log("label = " + mnist.train_labels[0]);
       // train_ind += 784;
        //noLoop();
    }
    
    image(user_digit, 0, 0);
    if(mouseIsPressed)
    {
        user_digit.stroke(255);
        user_digit.strokeWeight(16);
        user_digit.line(mouseX, mouseY, pmouseX, pmouseY);
    }
    
}


function train()
{
      let inputs = [];
      let img = createImage(28, 28);
        img.loadPixels();
        for(let i = 0; i < 784; i++)
        {
            let bright = mnist.train_images[i + train_ind * 784];
            inputs[i] = bright / 255;
            img.pixels[i*4] = bright;
            img.pixels[i*4 + 1] = bright;
            img.pixels[i*4 + 2] = bright;
            img.pixels[i*4 + 3] = 255;
            
        }
        img.updatePixels();
        image(img, 200, 0, 200, 200);
        
        
        let targets = [0, 0, 0, 0 ,0 , 0, 0, 0, 0, 0];
        let num = mnist.train_labels[train_ind];
        targets[num] = 1;
        
       // console.log(inputs);
        //console.log(targets);
        //console.log("train ind = " + train_ind);
        
        let prediction = nn.predict(inputs);
        nn.train(inputs, targets)
        let guess = getMax(prediction);
        
        
        select('#label').html(num);
        select('#guess').html(guess);
        
        if(guess === num)
        {
            select('#guess').class('correct');
        }
        else
        {
            select('#guess').class('wrong');
        }
        
        train_ind = (train_ind + 1) % 60000;
    
}

function getMax(arr)
{
    let m = 0;
    let ind;
    for(let i = 0; i < arr.length; i++)
        if(arr[i] > m)
        {
            m = arr[i];
            ind = i;
        }
        
    return ind;
}

function keyPressed()
{
    if(key == ' ')
        user_digit.background(0);
}


function guessUserDigit()
{
    let inputs = [];
    let img = user_digit.get();
    img.resize(28, 28);
    img.loadPixels();
    for(let i = 0; i< 784; i++)
        inputs[i] = img.pixels[i * 4] / 255;
    
     let prediction = nn.predict(inputs);
     let guess = getMax(prediction);
     select('#user_guess').html(guess);   
}


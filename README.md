# JavaScriptTheNewHardParts =>

# as soon as we start running our code, we create a global execution context

	-- thread of execution (parsing and executing the code line after line)
	-- live memory of variables with data (known as a global variable environment)

# when you execute a function you create a new execution context comprising:

	1: the thread of execution (we go through the code in the functon line by line)
	2: a local memory (variable environment) where anything defined in the fucntion is stored

# we keep track of the function being called in javascript with a call stack

# tracks which execution context we are in that is it, what function is currently being run and where to return to after an execution context is popped off the stack

# one global execution context, a new function execution context for every time we run a function

# asynchronicity is the backbone of modern web development in javascript

# javascript is single threaded (one command executing at a time ) and has a synchronous execution model (each line is executed in the order the code appears)

# so what if we need to wait some time before we can execute certain bits of code? perhaps we need to wait on fresh data from an api/server request or for a timer to complete and then execute our code

# we have a conundrum - a tension between wanting to delay some code execution but not wanting to block the thread from any further code running while we wait

### goals / 3 way conundrum

1. be able to do task that take a long time to complete e.g getting data from server

2. continue runnig our javascript code line by line without one long task blocking further javascript executing

3. when our slow task completes, we should be able to run functionality knowing
   that task is done and data is ready!

### conundrum

# problem

	 -- fundamentally untenable - blocks our single javascript thread from running any further code while the task completes 

# benefits

	-- it's easy to reason about 

# introducing web browser apis/ node background threads

	function printHello(){
		console.log("Hello");
	}
	setTimeout(printHello, 1000);

	console.log("Me First!");

### facade function => setTimeout()

	=> just spins up background work 
	=> not pure javascript, timer feature, a pretend func

# we're interacting with a world outside of javascript now - so we need rules

	function printHello(){
		console.log("Hello");
	}

	function blockFor1Sec(){
		// blocks in the javascript thread for 1 second 
		// e.g looping 
	}

	setTimeout(printHello, 0);

	blockFor1Sec();

	console.log("Me first!");

	# printHello() func is allowed back in javascript only when our call stack is empty and all our global code is finished before that it is wating in callback queue read to run 

	# and eventLoop is the processess for checking if the stack is empty (this is is global code finished running ) and which functions are ready in the callback queue ready to run 

	### probelms 
		--no problems!
		--our response data is only available in the callback function - callback hell 
		-- maybe it feels a little odd to think of a passing a function into another function only for it to run much later 

	### benifits 
		--super explicit once you understand how it works under-the-hood 

		
	## losing control of our execution 


	### 
		so if you're an aspring engineer and you're not working on tough problems everyday, then you fall into the trap of what i call easy learning. 
		easy learning is learning where you don't hit blocks and therefore you don't grow, so how do u do what i call hard learning that's effective 
		that actually is what makes you grow as an engineer. well, you do things like tough coding challenges. You build projects, You have assignments 
		But the problem with those is it's super tempting to do what? To do anything else besides that. Including, so we might be making a cup of tea.
		whatever, but even if it's not that, even if the other person's like, no no I can actually push through them. You may still fall into two traps.
		i call it the researcher versus the stack overflower.
		Ideally as a software engineer, we're always balancing these two extremes.
		i wanna understand everything and how it's working, but i simultaneously gotta make it work sometimes, just make it work without understanding every piece. we're always balancing these two needs.
		as a pro enginner facing tough challenges, we've hopefully learned to balance that effectively. But we could awlays get better at it, and the best way i know to get the balance right is pair programming.
		pair progamming, by separating the concerns. (navigator and driver)
		and exchange the role perodically
	###
	## plug and play script person 

	# introducing the readability enhancer - Promises

		--special object built into javascript that gets returned immediately 
		when we make a call to web browser api/feature 
		(e.g.  fetch ) that's set up to return promises (not all are)

		--promises act as a placeholder for the data we hope get back 
		from the web browser feature's background work 

		--we also attach the functionality we want to defer running until 
		that background work is done (using the built in .then method)

		--promises objects will automatically trigger that functionality to run 

			--the value returned from the web browser feature's work 
			(e.g. the returned data from the server using fetch ) will be that function's input/argument
			

	# but we need to know how our promise-deferred functionality gets back into javascript to be run 

		function display(data){ console.log(data); }
		function printHello(){ console.log('Hello'); }
		function blockFor300ms(){ /* blocks js thread for 300ms with long for loop */}

		setTimeout(printHello, 0);

		const futureData = fectch('https://twitter.com/will/tweets/1');
		futureData.then(display);
		blockFor300ms();

		// which runs first?

		console.log("Me first!");

		### we need a way of queuing up all this deferred functionality 

### problems

	-- 99% fo developers have no idea how they're working under the hood 
	-- debugging becomes super-hard 

### benifits

	-- cleaner readable style with pseudo-synchronous style code 
	-- nice error handling process

### promises, web apis, the callback & microtask queues and event loop allow us 	to defer our action until the 'work' (an api request, timer etc) is completed	 and continue running our code line by line in the meantime

### asynchronous javascript is the backbone of the modern web - letting us built fast 'non-blocking'

### itreators

	we regularly have lists or collection or data where we want to go through each item and do something to each element 


	const numbers = [4,5,6];

	for(let i=0; i < numbers.length; i++){
		console.log(numbers[i]);
	}

	we're going to discover there's a new beautiful way of thinking about using each element one-by-one 



	### programs store data and apply functionality to it, but there are two parts to applying functions to collection of data 

		1. the process of accessing each element
		2. what we want to do to each element 


	### iterators automate the accessing of each element - so we can focus on what to do to each element- and make it available to us in a smooth way


	### imagine if we could create a function that stored numbers and each time we ran the function it would return out an element (the next one) from numbers. NOTE: it'd have to remember which element was next up somehow

	### but this would let us think of our array/list as a 'stream'/flow of data with our function returning the next element from our 'stream'- this makes our code more readable and more functional 


	### but it starts with us returning a function from another fucntion 


	### functions can be returned from other function in javascript 

	function createNewFunction(){
		function add2(num){
			return num+2;
		}
		return add2;
	}

	const newFunction = createNewFunction();

	const result = newFunction(3);

	how can we run/call add2 now? outside of createNewFunction ?

	### we want to create a function that holds both our array, the position we are currently at in our 'stream' of elements and has the ability to return 
	the next element 

	function createFunction(array){
		let i=0;
		function inner(){
			const element = array[i];
			i++;
			return element;
		}
		return inner;

	}

	const returnNextElement = createFunction([4,5,6]);
	const element1 = returnNextElement();
	const element2 = returnNextElement();

	### how can we access the first element of our list?


	### the bond 
		--when a function inner is defined it gets a bond to the surrounding local memory in which it has been defined 
		--when we return out inner that surroundings live data is returned out too attached on the back of the function definition itself (which we now give a new global label returnNextElement)
		--when we call returnNextElement and don't find array or i in the immediate execution context we look into the function definition's 'backpack' of persistent live data 
		--the backpack is officially known as the C.O.V.E or 'closure'

    ### functions persisting there lexical scope references (there surrounding data where they were born) we call
    the whole concept closure and we call the backpack closure
    ### functions get to have a persistent cache of data (not there local memory )
    attached to there very down definition
    meaning we can have a function when called doesn't find data in itself and looks
    in its persistent cache attached to it or bundled up on a single function


    ### returnNextElement has everything we need all bundled up in it
        1. our underlying array itself
        2. the position we are currently in our 'stream' of elements
        3. the ability to return the next element

        this relies completely on the special property of functions in javascript
        that when they are born inside other functions and returned they get a backpack
        (closure)

        what is the posh name for returnNextElement ?
        => know as iterator function

    ### so iterators turn our data into 'stream' of actual values we can access one
    after another

    now we have functions that hold our underlying array, the position we're currently
    at in the array and return out the next item in the 'stream' of elements from our
    array when run

    this lets us have for loops that show us the element itself in the body on each
    loop and more deeply allows us to rethink arrays as flows of elements themselves
    which we can interact with by calling a function that switches that flow on to
    give us our next element

    we have truly 'decoupled' the process of accessing each element from what we want to
    do to each element

### javascript's built in iterator are actually objects with a next method that

when called returns the next element from the  'stream'/ flow - so let's restructure slightly

    function createFlow(){
        let i =0;
        const inner={next: function(){
            const element = array[i];
            i++;
            return element;
            }
        }
        return inner;

}

    const returnNextElement=createFlow([4,5,6]);
    const element1 = returnNextElement.next();
    const element2 = returnNextElement.next();

    and the built in iterators actually produce the next element in the format:
    {value: 4}


    	### once we start thinking of our data as flows (where we can pick of an element one-by-one)
    	we can rethink how we produce those flows javascript now lets us produce the flows
    	using a function

    function *createFlow(){ // generator function
      yield 4;
      yield 5;
      yield 6
    }
    const returnNextElement = createFlow()
    console.log(returnNextElement.next())
    console.log(returnNextElement.next())

    what do we hope returnNextElement.next() will return? but how?

### line 299 createFlow does not go inside createFlow's execution context instead

    it returns a special generator object with a function next on it when called it
    gonna do something fascinating. now returnNextElement has next method on it
    because it was the output of running createFlow
    we have now finished call to create flow

    ### line 300 is going to open the execution context of createFow
    it's gonna start initiate calling createFlow, the function from which
    it was born
    yield is a super powerful keyword just like return that exits out of
    function, but it's suspending the execution context, it's not ending it

    ### this allows us to dynamically set what data flows to us (when we run returnNextElement's function )

    function *createFlow(){
        const num=10;
        const newNum = yield num; // not a thing u can store in newNum
        yield 5 + newNum;
        yield 6
    }
    const returnNextElement = createFlow();
    console.log(returnNextElement.next());
    console.log(returnNextElement.next(2));

    ###  this io gonna allow us to pass data back into our execution context
    almost like an argument back into it so yield 10 its job before was to return 10
    and then we come back in to the function, it didn't get a chance because
    this yield was so powerful it threw the ten out into the last call to
    next and stored it in element one and when we come back that expression
    evaluates through it becomes to javascript inside of here, whatever we pass in as the input
    line 327 and that is the very nature of the design of these generator functions
    when you go back into them you get to insert data back into their local executtion
    context as the evaluated result of the previous yield expression, the previous
    yield statement
    not a thing u can store in newNum but we pass back into number two which replaces
    that piece, is a thing we just throw a newNum =2;
    ### its, a paradigm shift in how we think about designing our code

### returnNextElement is a special object (a generator object ) that when its next

method is run starts (or continues ) running createFlow until it hits yield and return out the
value being yielded

we end up with 'stream'/flow of values that we can get one-by-one
by running returnNextElement.next()

### and most importantly, for the first time we get a pause('suspend')

a function being run and then return to it by calling
returnNextElement.next()

    # in  asynchronous javascript we want to
        1. initiate a task that takes a long time (e.g. requesting data from the server)
        2. move to more synchronous regular code in the meantime
        3. run some functionality once the requested data has come back

        what if we were to yield out of the function at the moment of sending
        off the long-time task and return to the function only when the is complete

    ### we can use the ability to pause createFlow's running and then restart
    it only when our data returns

    function doWhenDataReceived(value){
        returnNextElement.next(value)
    }

    function* createFlow(){
    const data = yield fetch ('http://twitter.com/will/tweets/1');
    console.log(data);
    }
    const returnNextElement = createFlow()
    const futureData = returnNextElement.next()

    futureData.then(doWhenDataReceived);

#### async/ await simplifies all this and finally fixes the inversion of control

    problem of callbacks


    async function createFlow(){
        console.log("Me First");
        const data = await fetch('http://twitter.com/will/tweets/1');
        console.log(data);
    }
    createFlow();
    console.log("Me second");

    #### no need for a triggered function on the promise resolution, instead we auto
    trigger the resumption of the createFlow execution (this functionality is still added to the microtask queue though)


























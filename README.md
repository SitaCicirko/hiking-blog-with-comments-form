I created a database and connected it to my server. After a while I kept getting an error and couldn’t figure out why, as everything was working in the beginning . I changed the code to include try and catch, but I still couldn’t figure out why I wasn’t fetching the data.

I deleted the whole project and started from scratch. After that Ive slowly copied and tested each file and I realized I had placed the .env file in the wrong location—it was in the src folder. I must have accidentally moved it somehow.

Next challenge was names of the trails that contained a space I had to figure out how to change \_ into " ".
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
added try and catch for errors

I kept having an error in my TrailPage: `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
few hours later...
I tried multiple different changes and the error is still there so I went back to the code we've been thought by Manny. The code is working as it should anyway.

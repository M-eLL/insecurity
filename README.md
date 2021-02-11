## Welcome to the insecurity wiki!
***


In.security is an encryption-protected journaling application. It serves to provide the user reassurance that their thoughts will be safe in an online world with increasing privacy concerns

It utilizes CryptoJS to provide client-side encryption of each entry before getting stored in the database. This adds an extra layer of security by ensuring that entries are never sent as plain text and are only broadcasted as encrypted text. The server never sees the user's entries in plaintext form.

Additionally, the user is protected with a bcryptjs hashing function on the backend and auth routes on the frontend to create restricted access to certain routes.

Another layer of protection is provided with a tailored algorithm to determine the duration of decrypted rendering of an entry based on the character count of each individual entry and the average human reading speed

Finally, after a set number of wrong passphrase attempts, the entry will be "deleted" from the rest of the entries and only able to be recovered using the user's recovery code


***

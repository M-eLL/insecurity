# insecurity
In.security is an encryption-protected journaling application. It utilizes CryptoJS to provide client-side encryption of each entry before getting stored in the database. This adds an extra layer of security by ensuring that entries are never sent as plain text and are only broadcasted as encrypted text. The server never sees the user's entries in plaintext form.

Additionally, the user is protected with a bcryptjs hashing function on the backend and auth routes on the frontend to create restricted access to certain routes.

Another layer of protection is provided with a tailored algorithm to determine the duration of decrypted rendering of an entry based on the character count of each individual entry and the average human reading speed

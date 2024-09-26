# Endpoints

* `/api/basket`
> GET returns list of all baskets
> POST adds basket with `capacity` passed through request body.

* `/api/basket/:bagelId`
> GET returns basket with given id

* `/api/basket/:basketId/bagels/:bagelId`
> POST adds a new bagel with :bagelId to the basket
> DELETE removes bagel with :bagelId from the basket

* `/api/bagels`
> GET returns all items in bagel store

* `/api/bagels/:bagelId` 
> GET returns all information about an item with :bagelId
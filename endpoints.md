# Endpoints

* `/basket`
> GET returns list of all baskets
> POST adds basket with `capacity` query param if present or default value if not present

* `basket/{id}`
> GET returns basket with given id
> DELETE removes basket with given id

* `/basket/{id}/bagels`
> GET returns list of bagels in basket with given id
> POST adds a new bagel (request body) to the basket with given id
> DELETE removes a bagel (request body) from the basket with given id

* `/basket/{id}/cost`
> GET returns total cost of all 

* `/basket/{id}/bagelAmount` 
> GET returns amount of bagels in basket with given id
# Registered methods for the Connector
### function `getGeographiesMediaRecentByGeoId ( params? : Object )`
> * **Method**: get 
> * **Path**: /geographies/{geo-id}/media/recent 
> * **Description**: Get recent media from a geography subscription that you created.  **Note:** You can only access Geographies that were explicitly created by your OAuth client. Check the Geography Subscriptions section of the [real-time updates page](https://instagram.com/developer/realtime/). When you create a subscription to some geography that you define, you will be returned a unique `geo-id` that can be used in this query. To backfill photos from the location covered by this geography, use the [media search endpoint](https://instagram.com/developer/endpoints/media/).  **Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015  
> * **Deprecated**: true 
> * **Parameters**: 
>   * *geo-id:* The geography ID.
>      * required: true
>      * type: string
>   * *count:* Max number of media to return.
>      * required: false
>      * type: integer
>   * *min_id:* Return media before this `min_id`.
>      * required: false
>      * type: string
### function `getLocationsSearch ( params? : Object )`
> * **Method**: get 
> * **Path**: /locations/search 
> * **Description**: Search for a location by geographic coordinate. 
> * **Parameters**: 
>   * *distance:* Default is 1000m (distance=1000), max distance is 5000.
>      * required: false
>      * type: integer
>   * *facebook_places_id:* Returns a location mapped off of a Facebook places id. If used, a Foursquare id and `lat`, `lng` are not required.
>      * required: false
>      * type: string
>   * *foursquare_id:* Returns a location mapped off of a foursquare v1 api location id. If used, you are not required to use `lat` and `lng`. Note that this method is deprecated; you should use the new foursquare IDs with V2 of their API. 
>      * required: false
>      * type: string
>   * *lat:* Latitude of the center search coordinate. If used, `lng` is required.
>      * required: false
>      * type: number
>   * *lng:* Longitude of the center search coordinate. If used, `lat` is required.
>      * required: false
>      * type: number
>   * *foursquare_v2_id:* Returns a location mapped off of a foursquare v2 api location id. If used, you are not required to use `lat` and `lng`. 
>      * required: false
>      * type: string
### function `getLocationsByLocationId ( params? : Object )`
> * **Method**: get 
> * **Path**: /locations/{location-id} 
> * **Description**: Get information about a location. 
> * **Parameters**: 
>   * *location-id:* The location ID.
>      * required: true
>      * type: string
### function `getLocationsMediaRecentByLocationId ( params? : Object )`
> * **Method**: get 
> * **Path**: /locations/{location-id}/media/recent 
> * **Description**: Get a list of recent media objects from a given location. 
> * **Parameters**: 
>   * *location-id:* The location ID.
>      * required: true
>      * type: string
>   * *min_timestamp:* Return media after this UNIX timestamp.
>      * required: false
>      * type: integer
>   * *max_timestamp:* Return media before this UNIX timestamp.
>      * required: false
>      * type: integer
>   * *min_id:* Return media before this `min_id`.
>      * required: false
>      * type: string
>   * *max_id:* Return media after this `max_id`.
>      * required: false
>      * type: string
### function `getMediaPopular ( params? : Object )`
> * **Method**: get 
> * **Path**: /media/popular 
> * **Description**: Get a list of what media is most popular at the moment. Can return mix of `image` and `video` types.  **Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015  
> * **Deprecated**: true 
> * **Parameters**:  
### function `getMediaSearch ( params? : Object )`
> * **Method**: get 
> * **Path**: /media/search 
> * **Description**: Search for media in a given area. The default time span is set to 5 days. The time span must not exceed 7 days. Defaults time stamps cover the last 5 days. Can return mix of `image` and `video` types.  
> * **Parameters**: 
>   * *lat:* Latitude of the center search coordinate. If used, `lng` is required.
>      * required: true
>      * type: number
>   * *lng:* Longitude of the center search coordinate. If used, `lat` is required.
>      * required: true
>      * type: number
>   * *min_timestamp:* A unix timestamp. All media returned will be taken later than this timestamp.
>      * required: false
>      * type: integer
>   * *max_timestamp:* A unix timestamp. All media returned will be taken earlier than this timestamp.
>      * required: false
>      * type: integer
>   * *distance:* Default is 1km (distance=1000), max distance is 5km.
>      * required: false
>      * type: integer
### function `getMediaShortcodeByShortcode ( params? : Object )`
> * **Method**: get 
> * **Path**: /media/shortcode/{shortcode} 
> * **Description**: This endpoint returns the same response as `GET /media/{media-id}`.  A media object's shortcode can be found in its shortlink URL. An example shortlink is `http://instagram.com/p/D/`, its corresponding shortcode is `D`.  
> * **Parameters**: 
>   * *shortcode:* The short code of the media resource.
>      * required: true
>      * type: string
### function `getMediaByMediaId ( params? : Object )`
> * **Method**: get 
> * **Path**: /media/{media-id} 
> * **Description**: Get information about a media object. The returned type key will allow you to differentiate between image and video media.  **Note:** if you authenticate with an OAuth Token, you will receive the user_has_liked key which quickly tells you whether the current user has liked this media item.  
> * **Parameters**: 
>   * *media-id:* The ID of the media resource.
>      * required: true
>      * type: string
### function `getMediaCommentsByMediaId ( params? : Object )`
> * **Method**: get 
> * **Path**: /media/{media-id}/comments 
> * **Description**: Get a list of recent comments on a media object. 
> * **Parameters**: 
>   * *media-id:* The ID of the media resource.
>      * required: true
>      * type: string
### function `postMediaCommentsByMediaId ( params? : Object )`
> * **Method**: post 
> * **Path**: /media/{media-id}/comments 
> * **Description**: Create a comment on a media object with the following rules:    * The total length of the comment cannot exceed 300 characters.   * The comment cannot contain more than 4 hashtags.   * The comment cannot contain more than 1 URL.   * The comment cannot consist of all capital letters.  
> * **Parameters**: 
>   * *media-id:* The ID of the media resource.
>      * required: true
>      * type: string
>   * *text:* Text to post as a comment on the media object as specified in `media-id`.
>      * required: true
>      * type: string
### function `deleteMediaCommentsByMediaIdCommentId ( params? : Object )`
> * **Method**: delete 
> * **Path**: /media/{media-id}/comments/{comment-id} 
> * **Description**: Remove a comment either on the authenticated user's media object or authored by the authenticated user.  
> * **Parameters**: 
>   * *media-id:* The ID of the media resource.
>      * required: true
>      * type: string
>   * *comment-id:* The ID of the comment entry.
>      * required: true
>      * type: string
### function `deleteMediaLikesByMediaId ( params? : Object )`
> * **Method**: delete 
> * **Path**: /media/{media-id}/likes 
> * **Description**: Remove a like on this media by the currently authenticated user. 
> * **Parameters**: 
>   * *media-id:* The ID of the media resource.
>      * required: true
>      * type: string
### function `getMediaLikesByMediaId ( params? : Object )`
> * **Method**: get 
> * **Path**: /media/{media-id}/likes 
> * **Description**: Get a list of users who have liked this media. 
> * **Parameters**: 
>   * *media-id:* The ID of the media resource.
>      * required: true
>      * type: string
### function `postMediaLikesByMediaId ( params? : Object )`
> * **Method**: post 
> * **Path**: /media/{media-id}/likes 
> * **Description**: Set a like on this media by the currently authenticated user. 
> * **Parameters**: 
>   * *media-id:* The ID of the media resource.
>      * required: true
>      * type: string
### function `getTagsSearch ( params? : Object )`
> * **Method**: get 
> * **Path**: /tags/search 
> * **Description**: Search for tags by name. 
> * **Parameters**: 
>   * *q:* A valid tag name without a leading \#. (eg. snowy, nofilter)
>      * required: true
>      * type: string
### function `getTagsByTagName ( params? : Object )`
> * **Method**: get 
> * **Path**: /tags/{tag-name} 
> * **Description**: Get information about a tag object. 
> * **Parameters**: 
>   * *tag-name:* The tag name.
>      * required: true
>      * type: string
### function `getTagsMediaRecentByTagName ( params? : Object )`
> * **Method**: get 
> * **Path**: /tags/{tag-name}/media/recent 
> * **Description**: Get a list of recently tagged media. Use the `max_tag_id` and `min_tag_id` parameters in the pagination response to paginate through these objects.  
> * **Parameters**: 
>   * *tag-name:* The tag name.
>      * required: true
>      * type: string
>   * *count:* Count of tagged media to return.
>      * required: false
>      * type: integer
>   * *min_tag_id:* Return media before this `min_tag_id`.
>      * required: false
>      * type: string
>   * *max_tag_id:* Return media after this `max_tag_id`.
>      * required: false
>      * type: string
### function `getUsersSearch ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/search 
> * **Description**: Search for a user by name. 
> * **Parameters**: 
>   * *q:* A query string.
>      * required: true
>      * type: string
>   * *count:* Number of users to return.
>      * required: false
>      * type: integer
### function `getUsersSelfFeed ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/self/feed 
> * **Description**: See the authenticated user's feed.  **Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015  
> * **Deprecated**: true 
> * **Parameters**: 
>   * *count:* Count of media to return.
>      * required: false
>      * type: integer
>   * *min_id:* Return media later than this `min_id`.
>      * required: false
>      * type: string
>   * *max_id:* Return media earlier than this `max_id`.
>      * required: false
>      * type: string
### function `getUsersSelfMediaLiked ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/self/media/liked 
> * **Description**: See the list of media liked by the authenticated user. Private media is returned as long as the authenticated user has permission to view that media. Liked media lists are only available for the currently authenticated user.  
> * **Parameters**: 
>   * *count:* Count of media to return.
>      * required: false
>      * type: integer
>   * *max_like_id:* Return media liked before this id.
>      * required: false
>      * type: string
### function `getUsersSelfRequestedBy ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/self/requested-by 
> * **Description**: List the users who have requested this user's permission to follow. 
> * **Parameters**:  
### function `getUsersByUserId ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/{user-id} 
> * **Description**: Get basic information about a user. To get information about the owner of the access token, you can use **self** instead of the `user-id`.  Security scope `public_content` is required to read information about other users.  
> * **Parameters**: 
>   * *user-id:* The ID of a user to get information about, or **self** to retrieve information about authenticated user.
>      * required: true
>      * type: string
### function `getUsersFollowedByByUserId ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/{user-id}/followed-by 
> * **Description**: Get the list of users this user is followed by. To get users followed by the owner of the access token, you can use **self** instead of the `user-id`.  
> * **Parameters**: 
>   * *user-id:* The ID of a user, or **self** to retrieve information about authenticated user.
>      * required: true
>      * type: string
### function `getUsersFollowsByUserId ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/{user-id}/follows 
> * **Description**: Get the list of users this user follows. To get follows of the owner of the access token, you can use **self** instead of the `user-id`.  
> * **Parameters**: 
>   * *user-id:* The ID of a user, or **self** to retrieve information about authenticated user.
>      * required: true
>      * type: string
### function `getUsersMediaRecentByUserId ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/{user-id}/media/recent 
> * **Description**: Get the most recent media published by a user. To get the most recent media published by the owner of the access token, you can use **self** instead of the `user-id`.  Security scope `public_content` is required to read information about other users.  
> * **Parameters**: 
>   * *user-id:* The ID of a user to get recent media of, or **self** to retrieve media of authenticated user.
>      * required: true
>      * type: string
>   * *count:* Count of media to return.
>      * required: false
>      * type: integer
>   * *max_timestamp:* Return media before this UNIX timestamp.
>      * required: false
>      * type: integer
>   * *min_timestamp:* Return media after this UNIX timestamp.
>      * required: false
>      * type: integer
>   * *min_id:* Return media later than this `min_id`.
>      * required: false
>      * type: string
>   * *max_id:* Return media earlier than this `max_id`.
>      * required: false
>      * type: string
### function `getUsersRelationshipByUserId ( params? : Object )`
> * **Method**: get 
> * **Path**: /users/{user-id}/relationship 
> * **Description**: Get information about a relationship to another user. 
> * **Parameters**: 
>   * *user-id:* The ID of a user to get information about.
>      * required: true
>      * type: string
### function `postUsersRelationshipByUserId ( params? : Object )`
> * **Method**: post 
> * **Path**: /users/{user-id}/relationship 
> * **Description**: Modify the relationship between the current user and the target user. 
> * **Parameters**: 
>   * *user-id:* The ID of the target user.
>      * required: true
>      * type: string
>   * *action:* Type of action to apply for relationship with the user.
>      * required: true
>      * type: string

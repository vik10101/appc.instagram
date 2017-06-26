module.exports = {
    source: "webAPI",
    getGeographiesMediaRecentByGeoId: {
        path: "/geographies/{geo-id}/media/recent",
        method: "get",
        parameters: [
            {
                description: "The geography ID.",
                "in": "path",
                name: "geo-id",
                required: true,
                type: "string"
            },
            {
                description: "Max number of media to return.",
                format: "int32",
                "in": "query",
                name: "count",
                required: false,
                type: "integer"
            },
            {
                description: "Return media before this `min_id`.",
                "in": "query",
                name: "min_id",
                required: false,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaListResponse",
                properties: {
                    data: {
                        description: "List of media entries",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/IdPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/geographies/{geo-id}/media/recent",
        deprecated: true,
        description: "Get recent media from a geography subscription that you created.\n\n**Note:** You can only access Geographies that were explicitly created by your OAuth client. Check the\nGeography Subscriptions section of the [real-time updates page](https://instagram.com/developer/realtime/).\nWhen you create a subscription to some geography that you define, you will be returned a unique `geo-id` that\ncan be used in this query. To backfill photos from the location covered by this geography, use the\n[media search endpoint](https://instagram.com/developer/endpoints/media/).\n\n**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015\n",
        functionName: "getGeographiesMediaRecentByGeoId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getLocationsSearch: {
        path: "/locations/search",
        method: "get",
        parameters: [
            {
                description: "Default is 1000m (distance=1000), max distance is 5000.",
                format: "int32",
                "in": "query",
                name: "distance",
                required: false,
                type: "integer"
            },
            {
                description: "Returns a location mapped off of a Facebook places id. If used, a Foursquare id and `lat`, `lng` are not required.",
                "in": "query",
                name: "facebook_places_id",
                required: false,
                type: "string"
            },
            {
                description: "Returns a location mapped off of a foursquare v1 api location id. If used, you are not required to use\n`lat` and `lng`. Note that this method is deprecated; you should use the new foursquare IDs with V2 of their API.\n",
                "in": "query",
                name: "foursquare_id",
                required: false,
                type: "string"
            },
            {
                description: "Latitude of the center search coordinate. If used, `lng` is required.",
                format: "double",
                "in": "query",
                name: "lat",
                required: false,
                type: "number"
            },
            {
                description: "Longitude of the center search coordinate. If used, `lat` is required.",
                format: "double",
                "in": "query",
                name: "lng",
                required: false,
                type: "number"
            },
            {
                description: "Returns a location mapped off of a foursquare v2 api location id. If used, you are not required to use\n`lat` and `lng`.\n",
                "in": "query",
                name: "foursquare_v2_id",
                required: false,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "LocationSearchResponse",
                properties: {
                    data: {
                        description: "List of found locations",
                        items: {
                            $ref: "#/definitions/LocationInfo"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/locations/search",
        description: "Search for a location by geographic coordinate.",
        functionName: "getLocationsSearch",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getLocationsByLocationId: {
        path: "/locations/{location-id}",
        method: "get",
        parameters: [
            {
                description: "The location ID.",
                "in": "path",
                name: "location-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "LocationInfoResponse",
                properties: {
                    data: {
                        $ref: "#/definitions/LocationInfo",
                        description: "Location brief information"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/locations/{location-id}",
        description: "Get information about a location.",
        functionName: "getLocationsByLocationId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getLocationsMediaRecentByLocationId: {
        path: "/locations/{location-id}/media/recent",
        method: "get",
        parameters: [
            {
                description: "The location ID.",
                "in": "path",
                name: "location-id",
                required: true,
                type: "string"
            },
            {
                description: "Return media after this UNIX timestamp.",
                format: "int64",
                "in": "query",
                name: "min_timestamp",
                required: false,
                type: "integer"
            },
            {
                description: "Return media before this UNIX timestamp.",
                format: "int64",
                "in": "query",
                name: "max_timestamp",
                required: false,
                type: "integer"
            },
            {
                description: "Return media before this `min_id`.",
                "in": "query",
                name: "min_id",
                required: false,
                type: "string"
            },
            {
                description: "Return media after this `max_id`.",
                "in": "query",
                name: "max_id",
                required: false,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaListResponse",
                properties: {
                    data: {
                        description: "List of media entries",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/IdPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/locations/{location-id}/media/recent",
        description: "Get a list of recent media objects from a given location.",
        functionName: "getLocationsMediaRecentByLocationId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getMediaPopular: {
        path: "/media/popular",
        method: "get",
        parameters: [],
        response: {
            "200": {
                schemaName: "MediaSearchResponse",
                properties: {
                    data: {
                        description: "Found media entries; some end-points do not return likes informtaion",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/popular",
        deprecated: true,
        description: "Get a list of what media is most popular at the moment. Can return mix of `image` and `video` types.\n\n**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015\n",
        functionName: "getMediaPopular",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getMediaSearch: {
        path: "/media/search",
        method: "get",
        parameters: [
            {
                description: "Latitude of the center search coordinate. If used, `lng` is required.",
                format: "double",
                "in": "query",
                name: "lat",
                required: true,
                type: "number"
            },
            {
                description: "Longitude of the center search coordinate. If used, `lat` is required.",
                format: "double",
                "in": "query",
                name: "lng",
                required: true,
                type: "number"
            },
            {
                description: "A unix timestamp. All media returned will be taken later than this timestamp.",
                format: "int64",
                "in": "query",
                name: "min_timestamp",
                required: false,
                type: "integer"
            },
            {
                description: "A unix timestamp. All media returned will be taken earlier than this timestamp.",
                format: "int64",
                "in": "query",
                name: "max_timestamp",
                required: false,
                type: "integer"
            },
            {
                description: "Default is 1km (distance=1000), max distance is 5km.",
                format: "int32",
                "in": "query",
                name: "distance",
                required: false,
                type: "integer"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaSearchResponse",
                properties: {
                    data: {
                        description: "Found media entries; some end-points do not return likes informtaion",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/search",
        description: "Search for media in a given area. The default time span is set to 5 days. The time span must not exceed 7 days.\nDefaults time stamps cover the last 5 days. Can return mix of `image` and `video` types.\n",
        functionName: "getMediaSearch",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getMediaShortcodeByShortcode: {
        path: "/media/shortcode/{shortcode}",
        method: "get",
        parameters: [
            {
                description: "The short code of the media resource.",
                "in": "path",
                name: "shortcode",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaEntryResponse",
                properties: {
                    data: {
                        $ref: "#/definitions/MediaEntry",
                        description: "Media resource information"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/shortcode/{shortcode}",
        description: "This endpoint returns the same response as `GET /media/{media-id}`.\n\nA media object's shortcode can be found in its shortlink URL. An example shortlink is\n`http://instagram.com/p/D/`, its corresponding shortcode is `D`.\n",
        functionName: "getMediaShortcodeByShortcode",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic",
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getMediaByMediaId: {
        path: "/media/{media-id}",
        method: "get",
        parameters: [
            {
                description: "The ID of the media resource.",
                "in": "path",
                name: "media-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaEntryResponse",
                properties: {
                    data: {
                        $ref: "#/definitions/MediaEntry",
                        description: "Media resource information"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/{media-id}",
        description: "Get information about a media object. The returned type key will allow you to differentiate between image and\nvideo media.\n\n**Note:** if you authenticate with an OAuth Token, you will receive the user_has_liked key which quickly tells\nyou whether the current user has liked this media item.\n",
        functionName: "getMediaByMediaId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic",
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getMediaCommentsByMediaId: {
        path: "/media/{media-id}/comments",
        method: "get",
        parameters: [
            {
                description: "The ID of the media resource.",
                "in": "path",
                name: "media-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "CommentsResponse",
                properties: {
                    data: {
                        description: "Collection of comments",
                        items: {
                            $ref: "#/definitions/CommentEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/{media-id}/comments",
        description: "Get a list of recent comments on a media object.",
        functionName: "getMediaCommentsByMediaId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic",
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    postMediaCommentsByMediaId: {
        path: "/media/{media-id}/comments",
        method: "post",
        parameters: [
            {
                description: "The ID of the media resource.",
                "in": "path",
                name: "media-id",
                required: true,
                type: "string"
            },
            {
                description: "Text to post as a comment on the media object as specified in `media-id`.",
                "in": "query",
                name: "text",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "StatusResponse",
                properties: {
                    data: {
                        description: "No data - 'null'",
                        type: "string"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/{media-id}/comments",
        description: "Create a comment on a media object with the following rules:\n\n  * The total length of the comment cannot exceed 300 characters.\n  * The comment cannot contain more than 4 hashtags.\n  * The comment cannot contain more than 1 URL.\n  * The comment cannot consist of all capital letters.\n",
        functionName: "postMediaCommentsByMediaId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "comments"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    deleteMediaCommentsByMediaIdCommentId: {
        path: "/media/{media-id}/comments/{comment-id}",
        method: "delete",
        parameters: [
            {
                description: "The ID of the media resource.",
                "in": "path",
                name: "media-id",
                required: true,
                type: "string"
            },
            {
                description: "The ID of the comment entry.",
                "in": "path",
                name: "comment-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "StatusResponse",
                properties: {
                    data: {
                        description: "No data - 'null'",
                        type: "string"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/{media-id}/comments/{comment-id}",
        description: "Remove a comment either on the authenticated user's media object or authored by the authenticated user.\n",
        functionName: "deleteMediaCommentsByMediaIdCommentId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "comments"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    deleteMediaLikesByMediaId: {
        path: "/media/{media-id}/likes",
        method: "delete",
        parameters: [
            {
                description: "The ID of the media resource.",
                "in": "path",
                name: "media-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "StatusResponse",
                properties: {
                    data: {
                        description: "No data - 'null'",
                        type: "string"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/{media-id}/likes",
        description: "Remove a like on this media by the currently authenticated user.",
        functionName: "deleteMediaLikesByMediaId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "likes"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getMediaLikesByMediaId: {
        path: "/media/{media-id}/likes",
        method: "get",
        parameters: [
            {
                description: "The ID of the media resource.",
                "in": "path",
                name: "media-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "UsersInfoResponse",
                properties: {
                    data: {
                        description: "User short information entries",
                        items: {
                            $ref: "#/definitions/UserShortInfo"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/{media-id}/likes",
        description: "Get a list of users who have liked this media.",
        functionName: "getMediaLikesByMediaId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic",
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    postMediaLikesByMediaId: {
        path: "/media/{media-id}/likes",
        method: "post",
        parameters: [
            {
                description: "The ID of the media resource.",
                "in": "path",
                name: "media-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "StatusResponse",
                properties: {
                    data: {
                        description: "No data - 'null'",
                        type: "string"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/media/{media-id}/likes",
        description: "Set a like on this media by the currently authenticated user.",
        functionName: "postMediaLikesByMediaId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "likes"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getTagsSearch: {
        path: "/tags/search",
        method: "get",
        parameters: [
            {
                description: "A valid tag name without a leading \\#. (eg. snowy, nofilter)",
                "in": "query",
                name: "q",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "TagSearchResponse",
                properties: {
                    data: {
                        description: "List of found tags with brief statistics",
                        items: {
                            $ref: "#/definitions/TagInfo"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/tags/search",
        description: "Search for tags by name.",
        functionName: "getTagsSearch",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getTagsByTagName: {
        path: "/tags/{tag-name}",
        method: "get",
        parameters: [
            {
                description: "The tag name.",
                "in": "path",
                name: "tag-name",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "TagInfoResponse",
                properties: {
                    data: {
                        $ref: "#/definitions/TagInfo",
                        description: "Tag brief information"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/tags/{tag-name}",
        description: "Get information about a tag object.",
        functionName: "getTagsByTagName",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getTagsMediaRecentByTagName: {
        path: "/tags/{tag-name}/media/recent",
        method: "get",
        parameters: [
            {
                description: "The tag name.",
                "in": "path",
                name: "tag-name",
                required: true,
                type: "string"
            },
            {
                description: "Count of tagged media to return.",
                "in": "query",
                name: "count",
                required: false,
                type: "integer"
            },
            {
                description: "Return media before this `min_tag_id`.",
                "in": "query",
                name: "min_tag_id",
                required: false,
                type: "string"
            },
            {
                description: "Return media after this `max_tag_id`.",
                "in": "query",
                name: "max_tag_id",
                required: false,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "TagMediaListResponse",
                properties: {
                    data: {
                        description: "List of media entries with this tag",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/TagPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/tags/{tag-name}/media/recent",
        description: "Get a list of recently tagged media. Use the `max_tag_id` and `min_tag_id` parameters in the pagination\nresponse to paginate through these objects.\n",
        functionName: "getTagsMediaRecentByTagName",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersSearch: {
        path: "/users/search",
        method: "get",
        parameters: [
            {
                description: "A query string.",
                "in": "query",
                name: "q",
                required: true,
                type: "string"
            },
            {
                description: "Number of users to return.",
                "in": "query",
                name: "count",
                required: false,
                type: "integer"
            }
        ],
        response: {
            "200": {
                schemaName: "UsersInfoResponse",
                properties: {
                    data: {
                        description: "User short information entries",
                        items: {
                            $ref: "#/definitions/UserShortInfo"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/search",
        description: "Search for a user by name.",
        functionName: "getUsersSearch",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersSelfFeed: {
        path: "/users/self/feed",
        method: "get",
        parameters: [
            {
                description: "Count of media to return.",
                "in": "query",
                name: "count",
                required: false,
                type: "integer"
            },
            {
                description: "Return media later than this `min_id`.",
                "in": "query",
                name: "min_id",
                required: false,
                type: "string"
            },
            {
                description: "Return media earlier than this `max_id`.",
                "in": "query",
                name: "max_id",
                required: false,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaListResponse",
                properties: {
                    data: {
                        description: "List of media entries",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/IdPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/self/feed",
        deprecated: true,
        description: "See the authenticated user's feed.\n\n**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015\n",
        functionName: "getUsersSelfFeed",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersSelfMediaLiked: {
        path: "/users/self/media/liked",
        method: "get",
        parameters: [
            {
                description: "Count of media to return.",
                "in": "query",
                name: "count",
                required: false,
                type: "integer"
            },
            {
                description: "Return media liked before this id.",
                "in": "query",
                name: "max_like_id",
                required: false,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaListResponse",
                properties: {
                    data: {
                        description: "List of media entries",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/IdPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/self/media/liked",
        description: "See the list of media liked by the authenticated user. Private media is returned as long as the authenticated\nuser has permission to view that media. Liked media lists are only available for the currently authenticated\nuser.\n",
        functionName: "getUsersSelfMediaLiked",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersSelfRequestedBy: {
        path: "/users/self/requested-by",
        method: "get",
        parameters: [],
        response: {
            "200": {
                schemaName: "UsersInfoResponse",
                properties: {
                    data: {
                        description: "User short information entries",
                        items: {
                            $ref: "#/definitions/UserShortInfo"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/self/requested-by",
        description: "List the users who have requested this user's permission to follow.",
        functionName: "getUsersSelfRequestedBy",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "follower_list"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersByUserId: {
        path: "/users/{user-id}",
        method: "get",
        parameters: [
            {
                description: "The ID of a user to get information about, or **self** to retrieve information about authenticated user.",
                "in": "path",
                name: "user-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "UserResponse",
                properties: {
                    data: {
                        $ref: "#/definitions/UserInfo",
                        description: "User basic information"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            },
            "404": "Not Found, user with such ID does not exist."
        },
        uri: "https://api.instagram.com/v1/users/{user-id}",
        description: "Get basic information about a user. To get information about the owner of the access token, you can use\n**self** instead of the `user-id`.\n\nSecurity scope `public_content` is required to read information about other users.\n",
        functionName: "getUsersByUserId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic",
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersFollowedByByUserId: {
        path: "/users/{user-id}/followed-by",
        method: "get",
        parameters: [
            {
                description: "The ID of a user, or **self** to retrieve information about authenticated user.",
                "in": "path",
                name: "user-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "UsersPagingResponse",
                properties: {
                    data: {
                        description: "List of user short information entries",
                        items: {
                            $ref: "#/definitions/UserShortInfo"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/CursorPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/{user-id}/followed-by",
        description: "Get the list of users this user is followed by. To get users followed by the owner of the access token, you\ncan use **self** instead of the `user-id`.\n",
        functionName: "getUsersFollowedByByUserId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "follower_list"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersFollowsByUserId: {
        path: "/users/{user-id}/follows",
        method: "get",
        parameters: [
            {
                description: "The ID of a user, or **self** to retrieve information about authenticated user.",
                "in": "path",
                name: "user-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "UsersPagingResponse",
                properties: {
                    data: {
                        description: "List of user short information entries",
                        items: {
                            $ref: "#/definitions/UserShortInfo"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/CursorPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/{user-id}/follows",
        description: "Get the list of users this user follows. To get follows of the owner of the access token, you can use **self**\ninstead of the `user-id`.\n",
        functionName: "getUsersFollowsByUserId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "follower_list"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersMediaRecentByUserId: {
        path: "/users/{user-id}/media/recent",
        method: "get",
        parameters: [
            {
                description: "The ID of a user to get recent media of, or **self** to retrieve media of authenticated user.",
                "in": "path",
                name: "user-id",
                required: true,
                type: "string"
            },
            {
                description: "Count of media to return.",
                "in": "query",
                name: "count",
                required: false,
                type: "integer"
            },
            {
                description: "Return media before this UNIX timestamp.",
                format: "int64",
                "in": "query",
                name: "max_timestamp",
                required: false,
                type: "integer"
            },
            {
                description: "Return media after this UNIX timestamp.",
                format: "int64",
                "in": "query",
                name: "min_timestamp",
                required: false,
                type: "integer"
            },
            {
                description: "Return media later than this `min_id`.",
                "in": "query",
                name: "min_id",
                required: false,
                type: "string"
            },
            {
                description: "Return media earlier than this `max_id`.",
                "in": "query",
                name: "max_id",
                required: false,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "MediaListResponse",
                properties: {
                    data: {
                        description: "List of media entries",
                        items: {
                            $ref: "#/definitions/MediaEntry"
                        },
                        type: "array"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    },
                    pagination: {
                        $ref: "#/definitions/IdPaginationInfo",
                        description: "Information for pagination"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/{user-id}/media/recent",
        description: "Get the most recent media published by a user. To get the most recent media published by the owner of the\naccess token, you can use **self** instead of the `user-id`.\n\nSecurity scope `public_content` is required to read information about other users.\n",
        functionName: "getUsersMediaRecentByUserId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "basic",
                    "public_content"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    getUsersRelationshipByUserId: {
        path: "/users/{user-id}/relationship",
        method: "get",
        parameters: [
            {
                description: "The ID of a user to get information about.",
                "in": "path",
                name: "user-id",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "RelationshipResponse",
                properties: {
                    data: {
                        $ref: "#/definitions/RelationshipInfo",
                        description: "Relationship information"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/{user-id}/relationship",
        description: "Get information about a relationship to another user.",
        functionName: "getUsersRelationshipByUserId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "follower_list"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    },
    postUsersRelationshipByUserId: {
        path: "/users/{user-id}/relationship",
        method: "post",
        parameters: [
            {
                description: "The ID of the target user.",
                "in": "path",
                name: "user-id",
                required: true,
                type: "string"
            },
            {
                description: "Type of action to apply for relationship with the user.",
                "enum": [
                    "follow",
                    "unfollow",
                    "block",
                    "unblock",
                    "approve",
                    "ignore"
                ],
                "in": "query",
                name: "action",
                required: true,
                type: "string"
            }
        ],
        response: {
            "200": {
                schemaName: "RelationshipPostResponse",
                properties: {
                    data: {
                        $ref: "#/definitions/RelationshipStatus",
                        description: "Current relationship status"
                    },
                    meta: {
                        $ref: "#/definitions/MetaData",
                        description: "Response meta-data"
                    }
                },
                returnType: "Item"
            }
        },
        uri: "https://api.instagram.com/v1/users/{user-id}/relationship",
        description: "Modify the relationship between the current user and the target user.",
        functionName: "postUsersRelationshipByUserId",
        security: [
            {
                api_key: []
            },
            {
                instagram_auth: [
                    "relationships"
                ]
            }
        ],
        securityDefinitions: {
            api_key: {
                "in": "query",
                name: "access_token",
                type: "apiKey"
            },
            instagram_auth: {
                authorizationUrl: "https://instagram.com/oauth/authorize/",
                flow: "implicit",
                scopes: {
                    basic: "to read a user's profile info and media (granted by default)",
                    comments: "to post and delete comments on a user's behalf",
                    follower_list: "to read the list of followers and followed-by users",
                    likes: "to like and unlike media on a user's behalf",
                    public_content: "to read any public profile info and media on a user’s behalf",
                    relationships: "to follow and unfollow accounts on a user's behalf"
                },
                type: "oauth2"
            }
        }
    }
}
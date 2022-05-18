const { object, string, number, date } = require("zod");

const payload = {
    body: object({
        first_name: string({
            required_error: "First name is required"
        }),
        age: number({
            required_error: "Age is required",
            invalid_type_error: "Age must be a number"
        }),
        height: number({
            required_error: "Height is required",
            invalid_type_error: "Height must be a number"
        }),
        birthday_date: string({
            required_error: "Birthday date is required",
        }),
        preferences: string({
            required_error: "Preferences is required"
        })
    })
};

const params = {
    params: object({
        dogId: string({
            required_error: "Dog id is required"
        })
    })
};

exports.createDogSchema = object({
    ...payload
});

exports.findDogSchema = object({
    ...params
});
exports.updateDogSchema = object({
    ...params,
    ...payload
});
exports.deleteDogSchema = object({
    ...params
});

exports.addDogFavoriteSchema = object({
    body: object({
        id_dog: number({
            required_error: "The dog id sender is required",
            invalid_type_error: "The dog id must be a number"
        }),
        id_dog_fav: number({
            required_error: "The id from the dog to add is required",
            invalid_type_error: "The dog id must be a number"
        }),
    })
})

exports.deleteDogFavoriteSchema = object({
    params: object({
        favId: string({
            required_error: "Dog favorite id is required"
        })
    }),
    body: object({
        id_dog: number({
            required_error: "Dog sender id is required",
            invalid_type_error: "Dog id sender must be a number"
        })  
    })
})

exports.getDogFavoritesSchema = object({
    body: object({
        id_dog: number({
            required_error: "Dog sender id is required",
            invalid_type_error: "Dog id sender must be a number"
        })  
    })
})
"use strict"


module.exports = (req, res, next) => {  

    const search = req.query?.search || {}
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

    const startDate = req.query?.startDate || null;
    const endDate = req.query?.endDate || null;

    if (startDate) {
        
        search.startDate = { $gte: new Date(startDate) }
    }
    if (endDate) {
        search.endDate = { $lte: new Date(endDate) }
    }


    const sort = req.query?.sort || {}


    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
    // PAGE:
    let page = Number(req.query?.page)
    page = (page > 0 ? page : 1) - 1
    // SKIP:
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page * limit)

    // Run SearchingSortingPagination engine for Model:
    res.getModelList = async function (Model, filters = {}, populate = null) {
        const filtersAndSearch = { ...filters, ...search }

        console.log(search);
        
             
        return await Model.find(filtersAndSearch).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    // Details:
    res.getModelListDetails = async function (Model, filters = {}) {
        const filtersAndSearch = { ...filters, ...search }
        const data = await Model.find(filtersAndSearch)
        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}

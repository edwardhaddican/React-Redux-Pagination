'use strict'
const R = require('ramda')

const using = (f = R) => {

    /**
     * Example of using Ramda / Jamda to express data computation as a pipeline
     * of composed functions. Take a look here, then implement the individual
     * functions in 01-jamda.js! Don't forget to `npm test`.
     */

    const isGte = f.flip(f.gte)

    const isInstructor = f.pipe(f.prop('role'), f.equals('instructor'))

    const hasWeekOrMoreVaca = f.pipe(f.prop('vacationDays'), isGte(7))

    const simplified = f.pick(['firstName', 'lastName', 'vacationDays'])

    const getInstructorsWithOneWeekOrMoreOfVaca = f.pipe(
        f.sort(f.descend(f.prop('dateUpdated'))), // sort descending by date
        f.uniqBy(f.prop('id')), // remove older duplicates
        f.filter(
            // take anyone who...
            f.both(
                // …is both…
                isInstructor, // …an instructor, and...
                hasWeekOrMoreVaca, // …has a week of vaca
            ),
        ),
        f.map(simplified), // get just these
    )

    return {
        getInstructorsWithOneWeekOrMoreOfVaca,
    }
}

module.exports = using

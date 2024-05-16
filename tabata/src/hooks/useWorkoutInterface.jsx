export function useWorkoutInterface() {

    /**
     *
     * @param {Object} workout
     * @param {String} workout.note
     * @param {Number} workout.prepare
     * @param {Number} workout.work
     * @param {Number} workout.restCycle
     * @param {Number} workout.cycles
     * @param {Number} workout.sets
     * @param {Number} workout.restSet
     * @returns {Number} total workout time
    */
    function workoutTotal(workout) {
        return workout.prepare + (((workout.work + workout.restCycle) * workout.cycles) + workout.restSet) * workout.sets;
    }

    /**
     *
     * @param {Number} seconds
     * @returns {String}
     */
    function secondsAsHumanReadable(seconds) {
        var seconds = parseInt(seconds, 10);
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - (hours * 3600)) / 60);
        var seconds = seconds - (hours * 3600) - (minutes * 60);
        if (!!hours) {
            if (!!minutes) {
                return `${hours}h:${minutes}m:${seconds}s`;
            } else {
                return `${hours}h:${seconds}s`;
            }
        }
        if (!!minutes) {
            return `${minutes}m:${seconds}s`;
        }
        return `${seconds}s`;
    }

    return [workoutTotal, secondsAsHumanReadable];
}

import { useCallback } from "react";

export function useWorkoutInterface() {

    /**
       * @typedef {Object} Workout
       * @property {String} workout.id
       * @property {String} workout.name
       * @property {String} workout.note
       * @property {Number} workout.prepare
       * @property {Number} workout.work
       * @property {Number} workout.restCycle
       * @property {Number} workout.cycles
       * @property {Number} workout.sets
       * @property {Number} workout.restSet
    */

    /**
     * @param {Workout} workout
    */
    const workoutTotal = useCallback((workout) => {
        return workout.prepare + (((workout.work + workout.restCycle) * workout.cycles) + workout.restSet) * workout.sets;
    });

    /**
     *
     * @param {Number} seconds
     * @returns {String}
     */
    const secondsAsHumanReadable = useCallback((seconds) => {
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
    });

    /**
     * @param {Workout} workout
    */
    const workoutAsQueue = useCallback((workout) => {
        const queue = createQueue();
        queue.enqueue({ message: 'prepare', duration: workout.prepare });
        console.log('workoutAsQueue build', queue);
        for (let index = 0; index < workout.sets; index++) {
            for (let index = 0; index < workout.cycles; index++) {
                queue.enqueue({ message: 'work', duration: workout.work });
                queue.enqueue({ message: 'rest', duration: workout.restCycle });
            }
            queue.enqueue({ message: 'rest', duration: workout.restSet });
        }
        return queue;
    });

    function createQueue() {
        const obj = {};
        obj.elements = {};
        obj.head = 0;
        obj.tail = 0;

        obj.enqueue = function (element) {
            obj.elements[this.tail] = element;
            obj.tail++;
        };

        obj.dequeue = function () {
            const item = obj.elements[obj.head];
            delete obj.elements[obj.head];
            obj.head++;
            return item;
        }

        /**
         * 
         * @param {Number} index 
         */
        obj.elementAt = function (index) {
            return obj.elements[index];
        }

        return obj;
    }

    return [workoutTotal, secondsAsHumanReadable, workoutAsQueue];
}

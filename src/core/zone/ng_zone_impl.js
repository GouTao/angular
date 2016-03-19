'use strict';/**
 * Stores error information; delivered via [NgZone.onError] stream.
 */
var NgZoneError = (function () {
    function NgZoneError(error, stackTrace) {
        this.error = error;
        this.stackTrace = stackTrace;
    }
    return NgZoneError;
})();
exports.NgZoneError = NgZoneError;
var NgZoneImpl = (function () {
    function NgZoneImpl(_a) {
        var _this = this;
        var trace = _a.trace, onEnter = _a.onEnter, onLeave = _a.onLeave, setMicrotask = _a.setMicrotask, setMacrotask = _a.setMacrotask, onError = _a.onError;
        this.onEnter = onEnter;
        this.onLeave = onLeave;
        this.setMicrotask = setMicrotask;
        this.setMacrotask = setMacrotask;
        this.onError = onError;
        if (Zone) {
            this.outer = this.inner = Zone.current;
            if (Zone['wtfZoneSpec']) {
                this.inner = this.inner.fork(Zone['wtfZoneSpec']);
            }
            if (trace) {
                this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
            }
            this.inner = this.inner.fork({
                name: 'angular',
                properties: { 'isAngularZone': true },
                onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
                    try {
                        _this.onEnter();
                        return delegate.invokeTask(target, task, applyThis, applyArgs);
                    }
                    finally {
                        _this.onLeave();
                    }
                },
                onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
                    try {
                        _this.onEnter();
                        return delegate.invoke(target, callback, applyThis, applyArgs, source);
                    }
                    finally {
                        _this.onLeave();
                    }
                },
                onHasTask: function (delegate, current, target, hasTaskState) {
                    delegate.hasTask(target, hasTaskState);
                    if (current == target) {
                        // We are only interested in hasTask events which originate from our zone
                        // (A child hasTask event is not interesting to us)
                        if (hasTaskState.change == 'microTask') {
                            _this.setMicrotask(hasTaskState.microTask);
                        }
                        else if (hasTaskState.change == 'macroTask') {
                            _this.setMacrotask(hasTaskState.macroTask);
                        }
                    }
                },
                onHandleError: function (delegate, current, target, error) {
                    delegate.handleError(target, error);
                    _this.onError(new NgZoneError(error, error.stack));
                    return false;
                }
            });
        }
        else {
            throw new Error('Angular2 needs to be run with Zone.js polyfill.');
        }
    }
    NgZoneImpl.isInAngularZone = function () { return Zone.current.get('isAngularZone') === true; };
    NgZoneImpl.prototype.runInner = function (fn) { return this.inner.runGuarded(fn); };
    ;
    NgZoneImpl.prototype.runOuter = function (fn) { return this.outer.run(fn); };
    ;
    return NgZoneImpl;
})();
exports.NgZoneImpl = NgZoneImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZV9pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lX2ltcGwudHMiXSwibmFtZXMiOlsiTmdab25lRXJyb3IiLCJOZ1pvbmVFcnJvci5jb25zdHJ1Y3RvciIsIk5nWm9uZUltcGwiLCJOZ1pvbmVJbXBsLmNvbnN0cnVjdG9yIiwiTmdab25lSW1wbC5pc0luQW5ndWxhclpvbmUiLCJOZ1pvbmVJbXBsLnJ1bklubmVyIiwiTmdab25lSW1wbC5ydW5PdXRlciJdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSDtJQUNFQSxxQkFBbUJBLEtBQVVBLEVBQVNBLFVBQWVBO1FBQWxDQyxVQUFLQSxHQUFMQSxLQUFLQSxDQUFLQTtRQUFTQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFLQTtJQUFHQSxDQUFDQTtJQUMzREQsa0JBQUNBO0FBQURBLENBQUNBLEFBRkQsSUFFQztBQUZZLG1CQUFXLGNBRXZCLENBQUE7QUFHRDtJQWNFRSxvQkFBWUEsRUFPWEE7UUFyQkhDLGlCQXdGQ0E7WUExRWNBLEtBQUtBLGFBQUVBLE9BQU9BLGVBQUVBLE9BQU9BLGVBQUVBLFlBQVlBLG9CQUFFQSxZQUFZQSxvQkFBRUEsT0FBT0E7UUFRdkVBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBO1FBQ3ZCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUN2QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsWUFBWUEsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFlBQVlBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtRQUV2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FB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QkEsRUFBRUEsT0FBYUEsRUFBRUEsTUFBWUEsRUFBRUEsS0FBVUE7b0JBRTFEQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtvQkFDcENBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO29CQUNsREEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ2ZBLENBQUNBO2FBQ3JCQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxpREFBaURBLENBQUNBLENBQUNBO1FBQ3JFQSxDQUFDQTtJQUNIQSxDQUFDQTtJQW5GTUQsMEJBQWVBLEdBQXRCQSxjQUFvQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFxRnhGRiw2QkFBUUEsR0FBUkEsVUFBU0EsRUFBYUEsSUFBU0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O0lBQ2xFSCw2QkFBUUEsR0FBUkEsVUFBU0EsRUFBYUEsSUFBU0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O0lBQzdESixpQkFBQ0E7QUFBREEsQ0FBQ0EsQUF4RkQsSUF3RkM7QUF4Rlksa0JBQVUsYUF3RnRCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBTdG9yZXMgZXJyb3IgaW5mb3JtYXRpb247IGRlbGl2ZXJlZCB2aWEgW05nWm9uZS5vbkVycm9yXSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ1pvbmVFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcjogYW55LCBwdWJsaWMgc3RhY2tUcmFjZTogYW55KSB7fVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOZ1pvbmVJbXBsIHtcbiAgc3RhdGljIGlzSW5Bbmd1bGFyWm9uZSgpOiBib29sZWFuIHsgcmV0dXJuIFpvbmUuY3VycmVudC5nZXQoJ2lzQW5ndWxhclpvbmUnKSA9PT0gdHJ1ZTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBvdXRlcjogWm9uZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIGlubmVyOiBab25lO1xuXG4gIHByaXZhdGUgb25FbnRlcjogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBvbkxlYXZlOiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIHNldE1pY3JvdGFzazogKGhhc01pY3JvdGFza3M6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHByaXZhdGUgc2V0TWFjcm90YXNrOiAoaGFzTWFjcm90YXNrczogYm9vbGVhbikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBvbkVycm9yOiAoZXJyb3I6IE5nWm9uZUVycm9yKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHt0cmFjZSwgb25FbnRlciwgb25MZWF2ZSwgc2V0TWljcm90YXNrLCBzZXRNYWNyb3Rhc2ssIG9uRXJyb3J9OiB7XG4gICAgdHJhY2U6IGJvb2xlYW4sXG4gICAgb25FbnRlcjogKCkgPT4gdm9pZCxcbiAgICBvbkxlYXZlOiAoKSA9PiB2b2lkLFxuICAgIHNldE1pY3JvdGFzazogKGhhc01pY3JvdGFza3M6IGJvb2xlYW4pID0+IHZvaWQsXG4gICAgc2V0TWFjcm90YXNrOiAoaGFzTWFjcm90YXNrczogYm9vbGVhbikgPT4gdm9pZCxcbiAgICBvbkVycm9yOiAoZXJyb3I6IE5nWm9uZUVycm9yKSA9PiB2b2lkXG4gIH0pIHtcbiAgICB0aGlzLm9uRW50ZXIgPSBvbkVudGVyO1xuICAgIHRoaXMub25MZWF2ZSA9IG9uTGVhdmU7XG4gICAgdGhpcy5zZXRNaWNyb3Rhc2sgPSBzZXRNaWNyb3Rhc2s7XG4gICAgdGhpcy5zZXRNYWNyb3Rhc2sgPSBzZXRNYWNyb3Rhc2s7XG4gICAgdGhpcy5vbkVycm9yID0gb25FcnJvcjtcblxuICAgIGlmIChab25lKSB7XG4gICAgICB0aGlzLm91dGVyID0gdGhpcy5pbm5lciA9IFpvbmUuY3VycmVudDtcbiAgICAgIGlmIChab25lWyd3dGZab25lU3BlYyddKSB7XG4gICAgICAgIHRoaXMuaW5uZXIgPSB0aGlzLmlubmVyLmZvcmsoWm9uZVsnd3RmWm9uZVNwZWMnXSk7XG4gICAgICB9XG4gICAgICBpZiAodHJhY2UpIHtcbiAgICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayhab25lWydsb25nU3RhY2tUcmFjZVpvbmVTcGVjJ10pO1xuICAgICAgfVxuICAgICAgdGhpcy5pbm5lciA9IHRoaXMuaW5uZXIuZm9yayh7XG4gICAgICAgIG5hbWU6ICdhbmd1bGFyJyxcbiAgICAgICAgcHJvcGVydGllczo8YW55PnsnaXNBbmd1bGFyWm9uZSc6IHRydWV9LFxuICAgICAgICBvbkludm9rZVRhc2s6IChkZWxlZ2F0ZTogWm9uZURlbGVnYXRlLCBjdXJyZW50OiBab25lLCB0YXJnZXQ6IFpvbmUsIHRhc2s6IFRhc2ssXG4gICAgICAgICAgICAgICAgICAgICAgIGFwcGx5VGhpczogYW55LCBhcHBseUFyZ3M6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMub25FbnRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0LCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMub25MZWF2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuXG4gICAgICAgIG9uSW52b2tlOiAoZGVsZWdhdGU6IFpvbmVEZWxlZ2F0ZSwgY3VycmVudDogWm9uZSwgdGFyZ2V0OiBab25lLCBjYWxsYmFjazogRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgYXBwbHlUaGlzOiBhbnksIGFwcGx5QXJnczogYW55W10sIHNvdXJjZTogc3RyaW5nKTogYW55ID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5vbkVudGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuaW52b2tlKHRhcmdldCwgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLm9uTGVhdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25IYXNUYXNrOlxuICAgICAgICAgICAgKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgaGFzVGFza1N0YXRlOiBIYXNUYXNrU3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgZGVsZWdhdGUuaGFzVGFzayh0YXJnZXQsIGhhc1Rhc2tTdGF0ZSk7XG4gICAgICAgICAgICAgIGlmIChjdXJyZW50ID09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBvbmx5IGludGVyZXN0ZWQgaW4gaGFzVGFzayBldmVudHMgd2hpY2ggb3JpZ2luYXRlIGZyb20gb3VyIHpvbmVcbiAgICAgICAgICAgICAgICAvLyAoQSBjaGlsZCBoYXNUYXNrIGV2ZW50IGlzIG5vdCBpbnRlcmVzdGluZyB0byB1cylcbiAgICAgICAgICAgICAgICBpZiAoaGFzVGFza1N0YXRlLmNoYW5nZSA9PSAnbWljcm9UYXNrJykge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNaWNyb3Rhc2soaGFzVGFza1N0YXRlLm1pY3JvVGFzayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNUYXNrU3RhdGUuY2hhbmdlID09ICdtYWNyb1Rhc2snKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldE1hY3JvdGFzayhoYXNUYXNrU3RhdGUubWFjcm9UYXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgb25IYW5kbGVFcnJvcjogKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgZXJyb3I6IGFueSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUuaGFuZGxlRXJyb3IodGFyZ2V0LCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihuZXcgTmdab25lRXJyb3IoZXJyb3IsIGVycm9yLnN0YWNrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXIyIG5lZWRzIHRvIGJlIHJ1biB3aXRoIFpvbmUuanMgcG9seWZpbGwuJyk7XG4gICAgfVxuICB9XG5cbiAgcnVuSW5uZXIoZm46ICgpID0+IGFueSk6IGFueSB7IHJldHVybiB0aGlzLmlubmVyLnJ1bkd1YXJkZWQoZm4pOyB9O1xuICBydW5PdXRlcihmbjogKCkgPT4gYW55KTogYW55IHsgcmV0dXJuIHRoaXMub3V0ZXIucnVuKGZuKTsgfTtcbn1cbiJdfQ==
'use strict';"use strict";
var change_detection_jit_generator_1 = require('./change_detection_jit_generator');
var JitProtoChangeDetector = (function () {
    function JitProtoChangeDetector(definition) {
        this.definition = definition;
        this._factory = this._createFactory(definition);
    }
    JitProtoChangeDetector.isSupported = function () { return true; };
    JitProtoChangeDetector.prototype.instantiate = function () { return this._factory(); };
    /** @internal */
    JitProtoChangeDetector.prototype._createFactory = function (definition) {
        return new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, 'util', 'AbstractChangeDetector', 'ChangeDetectorStatus')
            .generate();
    };
    return JitProtoChangeDetector;
}());
exports.JitProtoChangeDetector = JitProtoChangeDetector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaml0X3Byb3RvX2NoYW5nZV9kZXRlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtYVJyVTJ3OHMudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vaml0X3Byb3RvX2NoYW5nZV9kZXRlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsK0NBQXlDLGtDQUFrQyxDQUFDLENBQUE7QUFFNUU7SUFJRSxnQ0FBb0IsVUFBb0M7UUFBcEMsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxrQ0FBVyxHQUFsQixjQUFnQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU5Qyw0Q0FBVyxHQUFYLGNBQWdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXpELGdCQUFnQjtJQUNoQiwrQ0FBYyxHQUFkLFVBQWUsVUFBb0M7UUFDakQsTUFBTSxDQUFDLElBQUksMkRBQTBCLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFDNUMsc0JBQXNCLENBQUM7YUFDeEQsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSw4QkFBc0IseUJBa0JsQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge1Byb3RvQ2hhbmdlRGV0ZWN0b3IsIENoYW5nZURldGVjdG9yLCBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb259IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9ySklUR2VuZXJhdG9yfSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb25faml0X2dlbmVyYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBKaXRQcm90b0NoYW5nZURldGVjdG9yIGltcGxlbWVudHMgUHJvdG9DaGFuZ2VEZXRlY3RvciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZhY3Rvcnk6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVmaW5pdGlvbjogQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uKSB7XG4gICAgdGhpcy5fZmFjdG9yeSA9IHRoaXMuX2NyZWF0ZUZhY3RvcnkoZGVmaW5pdGlvbik7XG4gIH1cblxuICBzdGF0aWMgaXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG5cbiAgaW5zdGFudGlhdGUoKTogQ2hhbmdlRGV0ZWN0b3IgeyByZXR1cm4gdGhpcy5fZmFjdG9yeSgpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY3JlYXRlRmFjdG9yeShkZWZpbml0aW9uOiBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGVjdG9ySklUR2VuZXJhdG9yKGRlZmluaXRpb24sICd1dGlsJywgJ0Fic3RyYWN0Q2hhbmdlRGV0ZWN0b3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NoYW5nZURldGVjdG9yU3RhdHVzJylcbiAgICAgICAgLmdlbmVyYXRlKCk7XG4gIH1cbn1cbiJdfQ==
import React from "react"

const Specification = (props) => {
    const {
        screen,
        handleChangeScreen,
        operatingSystem,
        handleChangeOperatingSystem,
        processor,
        handleChangeProcessor,
        ram,
        handleChangeRam,
        storageCapacity,
        handleChangeStorageCapacity,
        dimensions,
        handleChangeDimensions,
        weight,
        handleChangeWeight,
        batteryCapacity,
        handleChangebatteryCapacity,
        frontCameraResolution,
        handleChangeFrontCameraResolution,
        rearCameraResolution,
        handleChangeRearCameraResolution,
        connectivity,
        handleChangeConnectivity,
        color,
        handleChangeColor,
    } = props
    return (
        <section className="bg-white p-6 flex flex-col gap-4">
            <h2 className="text-lg font-medium">Specifications</h2>
            <div className="input-display-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/display"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Display Details
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/display"
                    value={screen}
                    onChange={handleChangeScreen}
                />
            </div>
            <div className="input-operation-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Operating System
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={operatingSystem}
                    onChange={handleChangeOperatingSystem}
                />
            </div>
            <div className="input-operation-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Processor
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={processor}
                    onChange={handleChangeProcessor}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Ram
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={ram}
                    onChange={handleChangeRam}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Storage
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={storageCapacity}
                    onChange={handleChangeStorageCapacity}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Dimension
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={dimensions}
                    onChange={handleChangeDimensions}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Weight
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={weight}
                    onChange={handleChangeWeight}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Battery Capacity
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={batteryCapacity}
                    onChange={handleChangebatteryCapacity}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Front Camera Resolution
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={frontCameraResolution}
                    onChange={handleChangeFrontCameraResolution}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Rear Camera Resolution
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={rearCameraResolution}
                    onChange={handleChangeRearCameraResolution}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Connectivity
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={connectivity}
                    onChange={handleChangeConnectivity}
                />
            </div>
            <div className="input-processor-product flex items-center w-full gap-2">
                <label
                    htmlFor="form-product/operatingSystem"
                    className="form-label font-medium text-base min-w-[200px]"
                >
                    Color
                </label>
                <input
                    type="text"
                    className="form-control text-base px-2 py-2 border-[2px] outline-none w-full"
                    id="form-product/operatingSystem"
                    value={color}
                    onChange={handleChangeColor}
                />
            </div>
        </section>
    )
}

export default Specification

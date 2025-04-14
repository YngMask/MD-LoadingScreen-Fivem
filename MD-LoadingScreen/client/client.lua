local ClientLoadFramework = false

-- Event triggered when the player spawns
AddEventHandler("playerSpawned", function()
    if not ClientLoadFramework then
        -- Manually closes the NUI loading screen
        ShutdownLoadingScreenNui()
        ClientLoadFramework = true

        -- Checks if the fade effect is enabled in the configuration
        if Config.Fade then
            -- Immediate fade-out effect
            DoScreenFadeOut(0)
            -- Waits for 3 seconds (3000 ms)
            Wait(3000)
            -- Fade-in effect over 2.5 seconds (2500 ms)
            DoScreenFadeIn(2500)
        end

        -- Initializes the configured framework
        if Config.Framework == "ESX" then
            TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
            while ESX == nil do
                Wait(100)
            end
            print("[INFO] ESX framework successfully loaded.")
        elseif Config.Framework == "QBCore" then
            QBCore = exports['qb-core']:GetCoreObject()
            print("[INFO] QBCore framework successfully loaded.")
        else
            print("[INFO] No framework configured.")
        end
    end
end)

Citizen.CreateThread(function()
    -- Enables NUI focus and cursor
    SetNuiFocus(true, true) -- Enables the cursor and NUI focus
end)
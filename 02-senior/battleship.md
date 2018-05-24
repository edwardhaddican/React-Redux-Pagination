# Battleship Architecture

* What platform will this run on?
  * Needs to run on the web and mobile
    * Android and/or iOS? Does it need to be a app on an appstore, or can it be a mobile web app?
      * Needs to be on an app store
        * native code for the app (swift/kotlin || java)? React native? Progressive web app packaged for a store?
* How many players? Is it multi-player?
  * Turn based
  * Multiplayer only?
    * Needs two players, no AI
  * Real-time, needs refresh/reopen app?
    * Get notification
    * Real-time on the web
    * Time limit
  * Multiple games going at once? Or just one at a time?
    * One at a time
    * Replayable - see a replay

* For realtime?
  * Firebase v socketio


User

id | user_name | email | password | salt


Game

id | host_id | guest_id

ShipPosition

id | game_id | player_id | x_pos | y_pos | ship_type | 

Moves

id | game_id | player_id


GameBoard belongsTo Game


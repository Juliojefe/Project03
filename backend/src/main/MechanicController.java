@RestController
public class MechanicController {

    @GetMapping("/find-mechanics")
    public List<Mechanic> findMechanics(@RequestParam double lat, @RequestParam double lon, @RequestParam int radius) {
        // logic to return mechanics based on lat/lon
        return mechanicService.findNearby(lat, lon, radius);
    }
}

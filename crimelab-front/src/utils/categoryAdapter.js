export class CategoryAdapter {
    static adaptCategory(category) {
        switch (category) {
            case "Person":
                return "persons";
            case "Location":
                return "locations";
            case "City":
                return "cities";
            case "Relay":
                return "relays";
            case "Case":
                return "cases";
            default:
                return "persons";
        }
    }
}
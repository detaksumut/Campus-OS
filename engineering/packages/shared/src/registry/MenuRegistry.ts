import { Capability } from '@campus-os/identity-sdk';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  requiredCapabilities: string[]; // Changed from capabilityId to array
  children?: MenuItem[];
}

class MenuRegistryImpl {
  private menus: Map<string, MenuItem> = new Map();

  register(menu: MenuItem) {
    this.menus.set(menu.id, menu);
  }

  /**
   * Returns menus that the user has access to, based on their capabilities.
   */
  getMenusForCapabilities(userCapabilities: string[]): MenuItem[] {
    return Array.from(this.menus.values()).filter(menu => {
      // If a menu requires no specific capabilities, it's public.
      if (!menu.requiredCapabilities || menu.requiredCapabilities.length === 0) {
        return true;
      }
      
      // Allow access if the user has AT LEAST ONE of the required capabilities.
      // Alternatively, we could require ALL, but usually menus are visible if any child capability is met.
      return menu.requiredCapabilities.some(req => userCapabilities.includes(req));
    });
  }

  getAll(): MenuItem[] {
    return Array.from(this.menus.values());
  }
}

export const MenuRegistry = new MenuRegistryImpl();

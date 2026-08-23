# Custom Hooks Guide

## useScrollAnimation

Handles scroll-triggered animations with IntersectionObserver. Adds 'animate' class when element enters viewport.

### Usage

```typescript
import { useScrollAnimation } from '../../hooks';

export function MySection() {
  const sectionRef = useScrollAnimation({
    selector: '.my-item',      // CSS selector for elements to animate
    threshold: 0.2,            // When to trigger (0-1, default: 0.2)
    onlyOnce: true            // Only animate once, don't remove class (default: false)
  });

  return (
    <section ref={sectionRef}>
      <div className="my-item">Item 1</div>
      <div className="my-item">Item 2</div>
    </section>
  );
}
```

### Examples in Codebase
- **BlogSection** - Animates `.blog-card` elements on scroll
- **SkillsSection** - Can animate `.skill-group` elements
- **ExperienceSection** - Can animate `.experience-item` elements
- **BackgroundSection** - Can animate `.timeline-item` elements

---

## useReAnimate

Re-triggers animations when content changes. Removes and re-adds animate class.

### Usage

```typescript
import { useReAnimate } from '../../hooks';

export function MySection() {
  const [items, setItems] = useState<Item[]>([]);
  const containerRef = useReAnimate(items, {
    selector: '.item',        // CSS selector for elements to re-animate
    animateClass: 'animate',  // Class name to toggle (default: 'animate')
    delay: 0                  // Delay before re-adding class (default: 0)
  });

  return (
    <div ref={containerRef}>
      {items.map(item => (
        <div key={item.id} className="item">{item.name}</div>
      ))}
    </div>
  );
}
```

### Examples in Codebase
- **BlogSection** - Re-animates `.blog-card` when `filteredPosts` changes
- **ProjectsSection** - Can re-animate `.project-card` when filter changes

---

## Before & After

### Before (Repetitive Code)
```typescript
const sectionRef = useRef<HTMLElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = sectionRef.current?.querySelectorAll('.item');
          items?.forEach((item) => {
            item.classList.add('animate');
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  const current = sectionRef.current;
  if (current) {
    observer.observe(current);
  }

  return () => {
    if (current) {
      observer.unobserve(current);
    }
  };
}, []);

useEffect(() => {
  const items = sectionRef.current?.querySelectorAll('.item');
  items?.forEach((item) => {
    item.classList.remove('animate');
  });
  setTimeout(() => {
    items?.forEach((item) => {
      item.classList.add('animate');
    });
  }, 0);
}, [dependency]);
```

### After (Using Hooks)
```typescript
const sectionRef = useScrollAnimation({ 
  selector: '.item', 
  threshold: 0.2 
});
useReAnimate(dependency, { selector: '.item' });
```

**Lines Reduced:** ~60 → ~2 lines! 🎉

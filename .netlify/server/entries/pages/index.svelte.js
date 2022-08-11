var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_5d84e3f4 = require("../../_app/immutable/chunks/index-5d84e3f4.js");
const subscriber_queue = [];
function writable(value, start = import_index_5d84e3f4.n) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_5d84e3f4.d)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = import_index_5d84e3f4.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_5d84e3f4.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = (0, import_index_5d84e3f4.f)();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = (0, import_index_5d84e3f4.f)();
      cancel_task = false;
      task = (0, import_index_5d84e3f4.l)((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const Counter_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".counter.svelte-sx9eo4.svelte-sx9eo4{display:flex;border-top:1px solid rgba(0, 0, 0, 0.1);border-bottom:1px solid rgba(0, 0, 0, 0.1);margin:1rem 0}.counter.svelte-sx9eo4 button.svelte-sx9eo4{width:2em;padding:0;display:flex;align-items:center;justify-content:center;border:0;background-color:transparent;touch-action:manipulation;color:var(--text-color);font-size:2rem}.counter.svelte-sx9eo4 button.svelte-sx9eo4:hover{background-color:var(--secondary-color)}svg.svelte-sx9eo4.svelte-sx9eo4{width:25%;height:25%}path.svelte-sx9eo4.svelte-sx9eo4{vector-effect:non-scaling-stroke;stroke-width:2px;stroke:var(--text-color)}.counter-viewport.svelte-sx9eo4.svelte-sx9eo4{width:8em;height:4em;overflow:hidden;text-align:center;position:relative}.counter-viewport.svelte-sx9eo4 strong.svelte-sx9eo4{position:absolute;display:flex;width:100%;height:100%;font-weight:400;color:var(--accent-color);font-size:4rem;align-items:center;justify-content:center}.counter-digits.svelte-sx9eo4.svelte-sx9eo4{position:absolute;width:100%;height:100%}.hidden.svelte-sx9eo4.svelte-sx9eo4{top:-100%;user-select:none}",
  map: null
};
function modulo(n, m) {
  return (n % m + m) % m;
}
const Counter = (0, import_index_5d84e3f4.c)(($$result, $$props, $$bindings, slots) => {
  let offset;
  let $displayed_count, $$unsubscribe_displayed_count;
  let count = 0;
  const displayed_count = spring();
  $$unsubscribe_displayed_count = (0, import_index_5d84e3f4.a)(displayed_count, (value) => $displayed_count = value);
  $$result.css.add(css$2);
  {
    displayed_count.set(count);
  }
  offset = modulo($displayed_count, 1);
  $$unsubscribe_displayed_count();
  return `<div class="${"counter svelte-sx9eo4"}"><button aria-label="${"Decrease the counter by one"}" class="${"svelte-sx9eo4"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-sx9eo4"}"><path d="${"M0,0.5 L1,0.5"}" class="${"svelte-sx9eo4"}"></path></svg></button>

	<div class="${"counter-viewport svelte-sx9eo4"}"><div class="${"counter-digits svelte-sx9eo4"}" style="${"transform: translate(0, " + (0, import_index_5d84e3f4.e)(100 * offset, true) + "%)"}"><strong class="${"hidden svelte-sx9eo4"}" aria-hidden="${"true"}">${(0, import_index_5d84e3f4.e)(Math.floor($displayed_count + 1))}</strong>
			<strong class="${"svelte-sx9eo4"}">${(0, import_index_5d84e3f4.e)(Math.floor($displayed_count))}</strong></div></div>

	<button aria-label="${"Increase the counter by one"}" class="${"svelte-sx9eo4"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-sx9eo4"}"><path d="${"M0,0.5 L1,0.5 M0.5,0 L0.5,1"}" class="${"svelte-sx9eo4"}"></path></svg></button>
</div>`;
});
const Card_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".card.svelte-rrv8zy.svelte-rrv8zy{display:flex;flex-direction:column;align-items:center;border:1px solid black;background-color:#fff}.card.svelte-rrv8zy img.svelte-rrv8zy{filter:drop-shadow(6px 8px 6px #0063)}",
  map: null
};
const Card = (0, import_index_5d84e3f4.c)(($$result, $$props, $$bindings, slots) => {
  let { name: name2 = "charizard" } = $$props;
  let { imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" } = $$props;
  let { imageWidth = "100px" } = $$props;
  let properName = name2.charAt(0).toUpperCase() + name2.slice(1);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
    $$bindings.name(name2);
  if ($$props.imageURL === void 0 && $$bindings.imageURL && imageURL !== void 0)
    $$bindings.imageURL(imageURL);
  if ($$props.imageWidth === void 0 && $$bindings.imageWidth && imageWidth !== void 0)
    $$bindings.imageWidth(imageWidth);
  $$result.css.add(css$1);
  return `<div class="${"card svelte-rrv8zy"}"><img${(0, import_index_5d84e3f4.b)("src", imageURL, 0)} loading="${"lazy"}"${(0, import_index_5d84e3f4.b)("alt", name2, 0)} style="${"width: " + (0, import_index_5d84e3f4.e)(imageWidth, true)}" class="${"svelte-rrv8zy"}">
	<p>${(0, import_index_5d84e3f4.e)(properName)}</p>
</div>`;
});
const index_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-1jlhe5t{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1}",
  map: null
};
let index = 133;
let name = "eevee";
const Routes = (0, import_index_5d84e3f4.c)(($$result, $$props, $$bindings, slots) => {
  let path = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Home</title>`, ""}<meta name="${"description"}" content="${"Svelte demo app"}" data-svelte="svelte-t32ptj">`, ""}

<section class="${"svelte-1jlhe5t"}">${(0, import_index_5d84e3f4.v)(Card, "Card").$$render($$result, { imageURL: path, name }, {}, {})}

	<h2>try editing <strong>src/routes/index.svelte</strong></h2>

	${(0, import_index_5d84e3f4.v)(Counter, "Counter").$$render($$result, {}, {}, {})}
</section>`;
});

<template>
    <div class="dragfield" :style="fieldStyle" ref="field">
        <slot/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, SetupContext } from '@vue/composition-api'
import Vue from 'vue'
import draggable from 'vuedraggable';

export default defineComponent({

    setup(props, context) {
        let field = ref<HTMLElement>();
        let data = reactive({
            isDragging: false,
            pos: {
                top: 0,
                left: 0,
                x: 0,
                y: 0
            }
        })

        // ----- Mouse functions

        function onDown(e: MouseEvent) {
            data.isDragging = true;
        
            data.pos = {
                left: field.value.scrollLeft,
                top: field.value.scrollTop,
                x: e.clientX,
                y: e.clientY,
            };
        }

        function onUp(e: MouseEvent) {
            data.isDragging = false;
        }

        function onDrag(e: MouseEvent) {
            if(!data.isDragging) return;

            const dx = e.clientX - data.pos.x;
            const dy = e.clientY - data.pos.y;

            // Scroll the element
            field.value.scrollTop = data.pos.top - dy;
            field.value.scrollLeft = data.pos.left - dx;
        }

        // ----- Properties

        const fieldStyle = computed(() => {
            if(data.isDragging) {
                return {
                    cursor: 'grabbing',
                    userSelect: 'none'
                }
            } else {
                return {
                    cursor: 'initial',
                    userSelect: 'user-select'
                }
            }
        });

        // ----- Lifecycle

        onMounted(() => {
            const el = field.value;

            el.addEventListener('mousedown', onDown);
            el.addEventListener('mouseup', onUp);
            el.addEventListener('mousemove', onDrag);
        });

        onUnmounted(() => {
            const el = field.value;

            el.removeEventListener('mousedown', onDown);
            el.removeEventListener('mouseup', onUp);
            el.removeEventListener('mousemove', onDrag);
        });

        return {
            field,
            fieldStyle
        }
    }

})
</script>

<style lang="scss" scoped>
.dragfield {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
</style>
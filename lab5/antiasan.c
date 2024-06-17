// TODO:
void antiasan(unsigned long addr)
{
#include <sanitizer/asan_interface.h>

void antiasan(unsigned long address) {

    __asan_unpoison_memory_region((void *)address, 1);
}
